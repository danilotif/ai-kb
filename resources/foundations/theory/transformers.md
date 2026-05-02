---
title: Transformers
date_added: 2026-01-10
---

# Transformers

The architecture under everything. What attention actually computes and how the modern decoder-only LLM is wired.

## Self-attention

*(Q/K/V projection from token embeddings; scaled dot-product; softmax over a sequence; what each operation buys you)*

## Multi-head attention

*(parallel heads with smaller dims; what specialization heads tend to learn; concatenate + output projection)*

## Position information

*(absolute positional embeddings vs RoPE vs ALiBi; why RoPE won for long context)*

## The decoder block

*(LayerNorm → attention → residual → LayerNorm → MLP → residual; pre-norm vs post-norm)*

## MLP block

*(two-layer FFN with GELU/SwiGLU; usually 4× the model dim; where most parameters live)*

## Variations that matter

*(GQA, MQA, sliding-window attention, MoE replacing FFN)*

## Encoder, decoder, encoder-decoder

*(BERT vs GPT vs T5 — when each is appropriate; why decoder-only dominates LLMs)*

## What it can't do natively

*(arithmetic across long ranges, exact memory, true variable binding; the cases where tools and external memory are needed)*

## Resources

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [The Annotated Transformer](http://nlp.seas.harvard.edu/annotated-transformer/)

## Notes

*(none yet)*
