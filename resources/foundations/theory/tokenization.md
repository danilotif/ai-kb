---
title: Tokenization & BPE
date_added: 2026-01-15
---

# Tokenization & BPE

Tokenization is where text becomes ids the model can embed. It's also where most "why is this so slow / expensive / bad at non-English / weird about numbers" answers live. Worth treating as a first-class part of the system rather than an opaque preprocessing step.

## Why subword

The two extremes both fail:

- **Word-level** — vocabulary blows up; OOV tokens common; morphology lost (`run`, `runs`, `running` are unrelated ids).
- **Character/byte-level** — vocab tiny but sequences are 4–5× longer. Quadratic attention cost makes this a tax on every forward pass.

Subword is the compromise: short common units stay whole (`the`, `ation`, `def `), rare or novel content decomposes into smaller pieces, nothing is OOV. The cost of a token, in attention compute and in API billing, is roughly constant; you want each token to carry as much information as possible.

## BPE in one paragraph

Start from the byte (or character) alphabet. Count adjacent-symbol pair frequencies in a training corpus. Merge the most frequent pair into a new symbol; repeat until the vocabulary reaches the target size (typically 32k–256k). At inference, apply the same merges greedily to new text. The merges form a deterministic, reversible mapping. That's it. The "B" in modern BPE is **byte-level** — train over UTF-8 bytes so you can never produce an unrepresentable token, even for emoji or unseen scripts. GPT-2 pioneered this in 2019; everything since has copied it.

Variants you'll encounter:

- **WordPiece** (BERT) — same idea, slightly different merge criterion (likelihood-based rather than raw frequency).
- **SentencePiece / Unigram** (T5, Llama, Mistral) — train as a probabilistic model over many possible segmentations, prune to vocab size. Better at handling languages without whitespace word boundaries.
- **Tiktoken** — OpenAI's fast Rust BPE implementation. The reference tokenizer for GPT-4/4o/5 families.

In practice the algorithm matters less than the *training corpus*. A tokenizer trained heavily on English code and prose will encode English densely and Korean inefficiently. This is not fixable post-hoc.

## Vocabulary size

Bigger vocab → fewer tokens per text, longer training/inference per token (embedding lookup and final softmax both scale with vocab). The curve is broadly:

- ≤ 32k — fine for English-only, smaller models. The Llama 1/2 vocab.
- 50k–100k — modern frontier sweet spot. GPT-4 (~100k), Llama 3 (128k), Qwen (~150k).
- ≥ 200k — multilingual maximalists. DeepSeek V3 (~129k), some Indic-focused models go higher.

Above ~250k the embedding table starts to dominate parameter count for small models; at 70B+ scale it's a rounding error.

The output projection (logits) is the same shape as the embedding table — usually they're tied. Vocab size is therefore a real cost in both directions of every forward pass.

## Tokenizer effects you'll feel

**Language asymmetry.** Most frontier tokenizers are English-trained. Token counts roughly:

- English prose: ~0.75 tokens per word.
- Code: ~0.5 tokens per "thing", because BPE captures `def `, `        ` (8 spaces), etc.
- Spanish/French: ~1.1× English.
- Korean, Japanese, Arabic, Thai: ~2–4× English on the same tokenizer.

This is why Anthropic and Google tokenizers (trained more multilingually) charge less in tokens for Asian languages than GPT-4 did historically. It's not pricing per byte — it's pricing per token, and the tokenizer decides how many tokens a byte becomes.

**Numbers.** Many tokenizers split digits into 1–3 char chunks based on training frequency: `1234567` might become `123`, `4567` or `12`, `345`, `67`. This is a measurable contributor to arithmetic mistakes. Llama 3 and several recent models force per-digit tokenization (`1`, `2`, `3`, ...) specifically to fix this. Worth checking when you're debugging numerical regressions.

**Whitespace and code.** Code tokenizers add tokens for runs of leading whitespace (`\n    `, `\n        `). On Python, this halves token count vs naive. If your code is appearing inflated in token counts, the tokenizer probably wasn't trained on enough code.

## Special tokens and chat templates

Decoder-only LLMs are trained to produce stop tokens (`</s>`, `<|endoftext|>`) and to recognize role markers (`<|im_start|>user`, `[INST] ... [/INST]`, `<|user|>`, etc.). The exact format is *part of the model's training* — using the wrong template is a silent quality cliff, not a parse error. The model still produces text but with much weaker instruction-following.

Every Hugging Face model card now ships a Jinja `chat_template`. Use it. `tokenizer.apply_chat_template(messages, tokenize=False)` is the only sane interface.

## Tokenizer drift

A new tokenizer means new embeddings means a from-scratch re-train of any code that handles ids. Practical implications:

- **Re-pretraining is rare** because the tokenizer changes — most models in a family share a tokenizer across versions (Llama 3.0/3.1/3.2; Qwen 2.5/3).
- **Cross-family mixing is hard.** You can't naïvely concatenate logits from two models with different tokenizers; even basic things like ensembling break.
- **Inference engine support.** A new tokenizer needs llama.cpp / vLLM / mlx-lm to ship a parser. Lag on this is sometimes weeks for major releases.

## Rules of thumb

- For *cost estimation*, count `chars / 4` for English prose; double it for code-heavy or non-English content.
- For *prompt design*, expect 200K context to mean ~150K English words or ~100K tokens of dense code.
- For *fine-tuning*, never change the tokenizer — extending it requires reinit of the embeddings for new tokens and is a capability hit unless you have a serious continued-pretraining budget.
- When in doubt, run text through the model's actual tokenizer (`tiktoken`, `tokenizers`) and read the output. Surprises hide there.

## Resources

- [HF Tokenizers course](https://huggingface.co/learn/nlp-course/chapter6) — the standard tutorial.
- [SentencePiece paper](https://arxiv.org/abs/1808.06226)
- [Karpathy — Let's build the GPT tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE) — 2-hour deep dive, builds tiktoken from scratch.
- [tiktoken](https://github.com/openai/tiktoken) — OpenAI's fast BPE, useful for cost estimation against GPT models.
- [Comparing tokenizers across languages](https://huggingface.co/spaces/Xenova/the-tokenizer-playground) — visual playground, paste text, see splits.

## Notes

_(none yet)_
