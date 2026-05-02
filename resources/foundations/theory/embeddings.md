---
title: Embeddings
date_added: 2026-05-02
---

# Embeddings

Dense vector representations of text (or images, or audio, or anything you can make sequence-shaped). The substrate under retrieval, semantic search, classification, clustering, deduplication, and most "RAG" systems. The technology is older than transformers — word2vec is 2013 — but everything you'd actually deploy in 2026 is a transformer.

This page assumes you've seen contrastive learning before. The interesting parts are the design choices that distinguish a good production embedding model from a research one, and the gap between MTEB-leaderboard quality and your-task quality.

## What an embedding actually is

A function $f \colon \mathrm{text} \to \mathbb{R}^d$ such that semantic similarity in the original space corresponds to geometric proximity in the vector space, usually measured by cosine similarity:

$$\mathrm{sim}(a, b) = \frac{f(a) \cdot f(b)}{\|f(a)\|\, \|f(b)\|}$$

Two design decisions are baked into "semantic similarity":

- **What counts as similar?** Two paraphrases? Question and answer? Document and summary? Code and its docstring? These are all valid notions and produce different embedding spaces. The model is shaped by the training pairs, not by something fundamental.
- **At what granularity?** Word, sentence, paragraph, document, query, passage. Modern embedding models target one or a few of these explicitly; using one for the wrong scope degrades quality.

Modern embedding dimensions are 384 (small/cheap), 768 (default), 1024–1536 (high-quality), 3072+ (frontier). Storage and search cost scale linearly with dimension.

## Training: contrastive learning

You don't train embeddings with regression — there's no scalar target. You train them by pulling related examples together and pushing unrelated ones apart, in a shared geometry.

Standard objective is **InfoNCE**:

$$L = -\log \frac{\exp\!\left(\mathrm{sim}(a, b^{+}) / \tau\right)}{\sum_{b\, \in\, \mathrm{batch}} \exp\!\left(\mathrm{sim}(a, b) / \tau\right)}$$

For each anchor $a$, exactly one positive $b^{+}$ is correct; everything else in the batch is treated as a negative. Temperature $\tau$ controls the sharpness. Maximizing this is equivalent to maximizing a lower bound on the mutual information $I(a;\, b^{+})$.

Two practical knobs dominate everything else:

- **Batch size.** Bigger batch = more in-batch negatives = harder problem = better embeddings. Frontier embedding training uses batches of 32k–100k. Below ~4k it plateaus.
- **Hard negatives.** Random in-batch negatives are easy after a few epochs. *Mining* hard negatives — examples that look similar to the anchor but aren't — is what gets you from "OK" to "MTEB-leaderboard". Standard recipe: train a v0, run it over a corpus, find near-but-wrong examples, retrain.

## Bi-encoders vs cross-encoders

This split shapes everything downstream.

**Bi-encoder** — encode $a$ and $b$ independently, compare with a cheap dot product. Vectors are precomputable and indexable. Per-query cost is $O(d)$ for the encoding plus $O(\log n)$ for the search. Used for first-stage retrieval over large corpora. What people usually mean by "embedding model".

**Cross-encoder** — concatenate $a$ and $b$, run them through a transformer with full cross-attention, output a similarity score. No precomputation possible — each pair costs a forward pass. Quality is ~10–20% absolute improvement over bi-encoder on the same training data because the model can attend across the pair. Used as a *reranker* over the top 50–200 from a bi-encoder. See `retrieval/theory/reranking.md`.

The asymmetry is fundamental. You will always want both at scale.

## Architectural variants

**Dual-encoder** — separate encoders for query and passage, possibly with different weights. Useful when query and document distributions are very different (short query, long document; question vs answer style). E5-instruct, BGE-large variants, OpenAI text-embedding-3 all use weight-tied dual encoders with prefix tokens (`query:` / `passage:`) to differentiate roles.

**Late interaction (ColBERT)** — keep per-token embeddings instead of pooling to one vector. Compute query-token vs document-token similarity matrix at retrieval time, take the max-sim per query token, sum. ~10× more storage; recovers most of the cross-encoder gap; cleanly indexable. Has a niche.

**Matryoshka embeddings** — train so that the first $k$ dimensions of the full embedding are themselves a usable embedding for any $k$. Lets you store full 1536-d vectors but query with truncated 256-d for speed, no retraining. OpenAI text-embedding-3 and BGE-M3 ship with this property; massive operational win.

## Pooling

The transformer outputs one vector per token. To get one per text:

- `[CLS]` pooling (BERT-style) — use the special class token. Standard for encoder-only.
- Mean pooling — average non-padded token vectors. Robust default; what most modern embedding models use.
- Last-token pooling — use the final token's hidden state. Used in decoder-based embedders (LLM2Vec, instruction-tuned embedding models on top of Mistral/Qwen).

For decoder-only LLMs repurposed as embedders (a fast-growing family — Qwen3-Embedding, NV-Embed, Linq-Embed) the standard trick is bidirectional fine-tuning: drop the causal mask during embedding training so the model attends both directions, then last-token pooling.

## Specialization

A general-purpose embedding model is a compromise. For your specific task:

- **Domain fine-tuning** — continue training on in-domain pairs. Even 10k pairs help; 100k changes results dramatically.
- **Instruction-tuned embeddings** — prepend a task instruction to the input. E5-instruct, BGE-en-icl, NV-Embed all support this. "Given a query, retrieve documents that answer it" produces a different geometry than "find paraphrases".
- **Hard negative mining** with your retriever-in-the-loop — by far the highest-leverage move once a baseline exists.

Don't fine-tune until you've measured a baseline. Often the gap between text-embedding-3-large and your fine-tune is small, while the operational cost of maintaining a custom model is large.

## Evaluation: MTEB and its limits

**MTEB** (Massive Text Embedding Benchmark) is the de facto leaderboard — 56+ tasks across retrieval, classification, clustering, STS, reranking. Useful for cross-model comparison; misleading as a proxy for *your* task.

Two consistent gotchas:

- **Top of the leaderboard is heavily contaminated.** Models are trained on data that overlaps MTEB; gaming is rampant. Trust gaps of <2 points roughly nothing.
- **Average score hides task variance.** A model strong on STS but weak on retrieval is useless for RAG. Look at the per-task breakdown for tasks resembling yours, not the headline.

The serious version of evaluation is your own retrieval@k and downstream task accuracy on a frozen test set. 50–200 hand-curated examples beats MTEB's 56-task average for picking a model for your stack.

## Operational notes

- **Dimensionality.** Storage and ANN-search cost scale linearly. Use Matryoshka truncation aggressively — 256d is often within 1pp of 1536d for retrieval tasks.
- **Quantization.** int8 vector quantization halves memory at near-zero quality cost; binary quantization (1 bit per dimension) cuts 32× and loses ~5–10% recall, fine for first-stage retrieval before reranking.
- **Re-embedding.** Whenever you change embedding model, the entire index must be rebuilt. Plan for this — it's an ops decision, not just a quality decision.
- **API vs local.** OpenAI text-embedding-3-large and Voyage voyage-3 are at or near MTEB SOTA. Local: BGE-large, NV-Embed, Qwen3-Embedding-8B. The closed/open gap is ~5pp on MTEB, narrower on most real tasks.

## Resources

- [SBERT documentation](https://www.sbert.net) — the standard library and tutorials for sentence-transformers.
- [MTEB leaderboard](https://huggingface.co/spaces/mteb/leaderboard) — read with skepticism.
- [InfoNCE / CPC paper](https://arxiv.org/abs/1807.03748)
- [SimCSE](https://arxiv.org/abs/2104.08821) — the elegant unsupervised contrastive recipe.
- [E5 paper](https://arxiv.org/abs/2212.03533) — the dual-encoder + instruction-tuning baseline.
- [Matryoshka Representation Learning](https://arxiv.org/abs/2205.13147)
- [ColBERT v2](https://arxiv.org/abs/2112.01488) — late interaction at scale.

## Notes

_(none yet)_
