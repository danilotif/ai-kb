---
title: RL on reasoning
date_added: 2026-05-02
---

# RL on reasoning

Training models to think well, not just to predict the next token. The technique behind o-series, R1, Qwen-thinking.

## The core idea

*(post-train with RL where reward = correctness on a verifiable task; model learns to produce reasoning that leads to correct answers)*

## Verifiable rewards (RLVR)

*(math: numeric answer match; code: unit tests pass; logic: ground-truth step; the verifier is the trick)*

## GRPO

*(Group Relative Policy Optimization, DeepSeek's variant of PPO without a value model; cheaper, simpler, surprisingly effective)*

## DeepSeek-R1 recipe in brief

*(R1-Zero: pure RL from base, no SFT; R1: cold-start SFT then RL then SFT then RL; emergent long chain-of-thought)*

## Emergence of long reasoning

*(model spontaneously starts thinking longer when reward incentivizes it; "aha moments" in published traces)*

## Trade-offs

*(longer training, longer inference, occasional reward hacking; degraded performance on non-reasoning tasks if not balanced)*

## Distillation downstream

*(R1-Distill into Qwen/Llama bases; transfers reasoning capability cheaply; the practical path for everyone-not-frontier)*

## Open questions

*(does it transfer to non-verifiable domains; how does it interact with RLHF preference data; how to keep general capability)*

## Resources

- [DeepSeek-R1](https://arxiv.org/abs/2501.12948)
- [GRPO discussion](https://arxiv.org/abs/2402.03300)

## Notes

*(none yet)*
