---
title: DPO recipe
date_added: 2026-05-02
---

# DPO recipe

Take an SFT'd model, a few thousand preference pairs, get an aligned model. No reward model, no PPO loop.

## Prerequisite: SFT model

*(DPO trains *from* an SFT model, not from base; the reference is the SFT checkpoint)*

## Dataset shape

*(`{prompt, chosen, rejected}` jsonl; balance: not all "chosen" should be from the same source as "rejected")*

## Where the pairs come from

*(human labels, sampled from the SFT model with a ranker, real user thumbs-up/down, AI feedback)*

## Hyperparameters

*(`beta` 0.1–0.5: lower → more drift from reference; learning rate 5e-7 to 5e-6; usually 1 epoch is enough)*

## Common failure modes

*(reward hacking on length, on formatting, on a single pattern; over-optimization losing capability)*

## DPO vs IPO/KTO/SimPO

*(when DPO becomes unstable, swap to IPO or KTO; SimPO drops the reference model entirely)*

## Eval before/after

*(DPO can quietly regress general capability; always run an MMLU-Pro-class eval pre/post)*

## Tooling

*(TRL `DPOTrainer`, Axolotl DPO config, OpenRLHF for distributed runs)*

## Resources

- [TRL DPOTrainer](https://huggingface.co/docs/trl/dpo_trainer)
- [DPO paper](https://arxiv.org/abs/2305.18290)

## Notes

*(none yet)*
