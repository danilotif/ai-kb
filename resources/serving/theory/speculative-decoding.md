---
title: Speculative decoding
date_added: 2026-05-02
---

# Speculative decoding

A small "draft" model proposes tokens, the big "target" model verifies them in parallel. Cuts decode latency 2–3× when the draft is well-aligned.

## How it works

*(draft generates K candidate tokens; target runs one forward pass over those K positions; accept the longest matching prefix; on mismatch, fall back to target's token)*

## Why it's correctness-preserving

*(target either accepts what draft proposed or overrides; output distribution is identical to running target alone)*

## Choosing a draft

*(same family, much smaller — Qwen 7B drafting for Qwen 72B; or a tiny dedicated draft head; or n-gram draft from prompt)*

## Self-speculative

*(use early layers of the same model as the draft; no separate model; Medusa, EAGLE, EAGLE-2 lines)*

## Acceptance rate

*(the metric that matters; >70% acceptance → big speedup; below ~50% draft cost dominates)*

## Interaction with batching

*(speculative decoding fights for batch slots; not always a win at high batch sizes; engines like vLLM and TensorRT-LLM expose toggles)*

## Frontier model use

*(closed APIs use it heavily; partly explains how OpenAI/Anthropic serve at low latency)*

## Resources

- [Speculative Decoding paper (DeepMind)](https://arxiv.org/abs/2302.01318)
- [EAGLE](https://github.com/SafeAILab/EAGLE)

## Notes

*(none yet)*
