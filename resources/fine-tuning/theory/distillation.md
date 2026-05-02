---
title: Distillation
date_added: 2026-05-02
---

# Distillation

Train a small "student" to imitate a strong "teacher". The most cost-effective way to ship a small fast model that punches above its size.

## The basic recipe

*(generate teacher outputs on a large input set; train student via SFT on those outputs; optionally match logits / hidden states)*

## Trace distillation (reasoning)

*(teach short-chain-of-thought + answer; key technique behind DeepSeek-R1-Distill, Phi reasoning variants)*

## Logit-level vs sequence-level

*(KL on full distribution vs cross-entropy on sampled tokens; compute trade-off)*

## Choice of teacher and student

*(student must have enough capacity for the target capability; bigger student = more transfer; cap at ~10× size ratio)*

## Data scope

*(distill broadly to keep general capability; distill narrowly to specialize and accept regression elsewhere)*

## Combining with RL

*(distill then RLVR; distill then DPO with the teacher as preference labeler)*

## Limits

*(can't distill a capability the teacher doesn't have; small students plateau; "free intelligence" stops being free at some scale)*

## Resources

- [DistilBERT](https://arxiv.org/abs/1910.01108)
- [DeepSeek-R1-Distill discussion](https://arxiv.org/abs/2501.12948)

## Notes

*(none yet)*
