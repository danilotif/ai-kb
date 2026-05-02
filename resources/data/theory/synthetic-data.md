---
title: Synthetic data
date_added: 2026-05-02
---

# Synthetic data

Most frontier post-training is now synthetic. What it means, why it works, and where it breaks.

## Flavors

*(distillation from a stronger model, self-instruct, persona-conditioned generation, programmatic templates)*

## Why it works

*(format and style transfer; cheap scale; targeted skill data; controllable difficulty)*

## Distillation as the workhorse

*(strong-teacher → small-student; reasoning trace distillation; the DeepSeek-R1-Distill recipe)*

## Self-improvement loops

*(model generates → self-judges → keeps best → re-trains; STaR, RFT, RLAIF)*

## Model collapse

*(quality decay across generations of synthetic-on-synthetic training; mitigations: keep real data anchored, mix only)*

## Verifying synthetic data

*(sanity sampling, automatic quality classifiers, holdout eval to detect drift)*

## Legal and ethical edges

*(synthetic that imitates a copyrighted style, persona generation that mimics real people)*

## Resources

- [STaR](https://arxiv.org/abs/2203.14465)
- [Model collapse paper](https://arxiv.org/abs/2305.17493)

## Notes

*(none yet)*
