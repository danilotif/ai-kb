---
title: Transformers
date_added: 2026-01-10
---

# Transformers

The architecture under everything. The 2017 paper is famous; the 2026 LLM decoder block has drifted enough from it that the differences are worth knowing on their own. This page assumes you've seen attention before — the goal is the *modern* decoder-only stack and why each replacement happened.

## Self-attention in one line

Given token embeddings $X \in \mathbb{R}^{n \times d}$, project to queries, keys, values:

$$Q = X W_Q, \quad K = X W_K, \quad V = X W_V$$

Then

$$\mathrm{Attn}(Q, K, V) = \mathrm{softmax}\!\left(\frac{Q K^\top}{\sqrt{d_k}}\right) V$$

The softmax weights mix $V$ rows by similarity in the $Q$/$K$ subspace. The whole thing is differentiable, parallelizable across sequence positions, and — unlike RNNs — has constant gradient depth in $n$. That last property is most of why the architecture won.

## Multi-head attention

Split $d$ into $h$ heads of dimension $d_k = d/h$, run attention in each, concatenate, project out with $W_O$. Same parameter count as one fat head; far more expressive because each head can specialize on a different relation (induction, syntax, copy, refusal — these are real things people have isolated empirically in mechanistic interp).

## Position information

Self-attention is permutation-invariant. The original paper added sinusoidal positional embeddings to the input. That broke down hard at long context — extrapolation past trained lengths failed.

The modern answer is **RoPE** (Rotary Position Embeddings): rotate $Q$ and $K$ (not $V$) in 2D subspaces by an angle proportional to the absolute position. Inner products $Q_i \cdot K_j$ then depend only on $i - j$ and a frequency schedule. Two practical wins: extrapolation is a tunable knob (frequency-base scaling, YaRN, NTK-aware variants), and the position is *baked into the attention computation* rather than added at the embedding layer.

ALiBi (linearly bias scores by distance) was a brief alternative but RoPE dominated.

## The decoder block — what it actually looks like in 2026

```
x'  = x  + Attn(RMSNorm(x))     // pre-norm, RMSNorm not LayerNorm
x'' = x' + MLP(RMSNorm(x'))     // SwiGLU MLP, ~4× hidden dim
```

Drift from the 2017 paper:

- **Pre-norm** (norm before sub-block, residual on the outside) instead of post-norm. Trains much more stably at depth.
- **RMSNorm** instead of LayerNorm — drop the mean centering, keep the RMS scale. Cheaper, equally good, now ubiquitous.
- **SwiGLU** in the MLP: $(x W_1) \odot \mathrm{swish}(x W_2)$, then project with $W_3$. Gated activation; ~10–15% better loss at fixed compute than vanilla GELU MLPs. Three weight matrices instead of two — the $4\times$ hidden ratio is usually shrunk to $\sim 2.6\times$ to keep parameter count constant.
- **No bias** on most linear layers in modern Llama-style models. Free regularization at zero cost.

## Attention variants that matter

**Multi-Query Attention (MQA)** — one shared $K$/$V$ across all heads. Cuts KV cache by $h\times$. Quality cost is non-trivial.

**Grouped-Query Attention (GQA)** — $g$ KV heads shared across $h/g$ query heads. Sweet spot. Llama 3 70B has 64 query heads, 8 KV heads ($g = 8$). KV cache shrinks $8\times$, quality drop is in the noise. *Every modern LLM uses GQA or MQA*; the original "MHA = full per-head KV" is now a small-model curiosity.

**Sliding-window attention** — each token attends only to the previous $w$ tokens. Mistral 7B used $w = 4096$. Caps KV cache at $O(w)$ instead of $O(n)$. Mostly displaced by GQA + RoPE long-context tricks now, but still sees use in long-form models.

**Sparse / linear attention** (Performer, Linear Transformer, Mamba-as-attention) — full attention is $O(n^2)$; these aim for $O(n \log n)$ or $O(n)$. None has fully replaced softmax attention at frontier scale, mostly because the implicit kernel matters and softmax is just very good. Hybrid stacks (a few full layers + many linear) are the most successful version (Jamba, RecurrentGemma).

## MLP block

Two-thirds of a frontier model's parameters live in MLP weights. Modern recipe: 3 weight matrices for SwiGLU, hidden dim $\approx 2.6\, d$, no bias. Computationally this is the most arithmetic-intensive part of the model — the place where dense matmul performance matters most. Quantization here pays off the most for memory; quantization in attention pays off most for KV-cache size.

## Mixture of Experts replaces the FFN

In an MoE block the MLP is replaced by $E$ "experts" plus a router that picks the top-$k$ per token ($k = 1$ or $k = 2$ typically). Compute scales with $k$, parameters scale with $E$. DeepSeek V3: 671B total, ~37B active per token ($E = 257$, $k = 9$ with one shared expert).

Three things to keep straight:

- *Active params* drives compute and per-token speed.
- *Total params* drives VRAM (you can't dynamic-route what isn't loaded).
- Routing imbalance is the chronic failure mode — load-balancing losses, expert-choice routing, and shared-expert tricks all exist to keep it under control.

MoE is a memory-for-compute trade. Worthwhile when memory is cheap and compute (especially decode latency) is the bottleneck.

## Encoder vs decoder vs encoder-decoder

- **Encoder-only** (BERT, RoBERTa) — bidirectional attention, trained with masked-LM. Best for representations and discriminative tasks. Embedding models still mostly use this.
- **Decoder-only** (GPT, Llama, Claude, Qwen) — causal mask, autoregressive. Won everything generative.
- **Encoder-decoder** (T5, BART) — encoder over input, decoder over output with cross-attention. Theoretically clean for seq2seq; in practice decoder-only with prompt-as-prefix matches it on almost every task and is simpler to scale.

Why decoder-only won at scale: a single objective (next-token), trivial to scale to any sequence length, and generative + discriminative both reduce to it.

## What the architecture can't do natively

- **Exact arithmetic across long ranges.** Carries don't fit naturally in a fixed-width softmax. Models learn to fake it for short numbers and fail past digit lengths in the training distribution. Tool use is the practical fix.
- **True variable binding / dereferencing.** No pointer mechanism. Workaround is in-context retrieval and explicit scratchpads.
- **Memory beyond context.** Each forward pass is stateless given the prompt. RAG, long-context, and memory tokens are bolt-ons.
- **Algorithmic generalization.** Out-of-distribution length generalization on synthetic algorithmic tasks is famously bad. Real-world tasks usually live near the training distribution and this matters less.

These are architectural facts, not training failures. They shape what should be a model job versus a tool job in any system you build.

## Resources

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — the original paper, 2017.
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) — the visual reference everyone learned from.
- [The Annotated Transformer](http://nlp.seas.harvard.edu/annotated-transformer/) — full implementation alongside the paper.
- [RoPE paper](https://arxiv.org/abs/2104.09864)
- [GQA paper](https://arxiv.org/abs/2305.13245)
- [RMSNorm paper](https://arxiv.org/abs/1910.07467)
- [GLU Variants Improve Transformer (SwiGLU)](https://arxiv.org/abs/2002.05202)

## Notes

_(none yet)_
