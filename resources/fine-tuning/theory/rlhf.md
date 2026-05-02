---
title: RLHF & DPO
date_added: 2026-04-15
---

# RLHF & DPO

How preferences become weights. The post-training stage that turns a base model into a usable assistant.

## The classic RLHF pipeline

*(SFT → train reward model on pairwise preferences → PPO against reward model with KL anchor to SFT)*

## Reward modeling

*(Bradley-Terry on pairs; log-likelihood loss; the reward model is a classifier disguised as a regressor)*

## PPO for language models

*(on-policy rollouts, KL penalty against reference, value head, advantage estimation; what goes wrong in practice)*

## DPO

*(skip the reward model and the RL loop; closed-form objective directly on preference pairs; cheaper, simpler, often comparable)*

## DPO variants

*(IPO, KTO, ORPO, SimPO; each fixes a different DPO failure mode)*

## RLAIF

*(replace human labels with a strong model's labels; what stays, what changes)*

## RL with verifiable rewards (RLVR)

*(math/code where correctness is checkable; the engine behind o-series and DeepSeek-R1; less noise than human preference)*

## When to use which

*(DPO for style/format; PPO/GRPO for harder shaping; RLVR when you have a verifier)*

## Resources

- [InstructGPT paper](https://arxiv.org/abs/2203.02155)
- [DPO paper](https://arxiv.org/abs/2305.18290)
- [DeepSeek-R1 paper](https://arxiv.org/abs/2501.12948)

## Notes

*(none yet)*
