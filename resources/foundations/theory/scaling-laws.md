---
title: Scaling laws
date_added: 2026-05-02
---

# Scaling laws

The empirical relationships between compute, parameters, data, and capability. The reason frontier labs can budget training runs in advance.

## Kaplan scaling laws

*(2020: loss as a power law in compute, parameters, data; "bigger is better" era)*

## Chinchilla

*(2022 correction: at fixed compute, optimal `tokens ≈ 20 × parameters`; previous models were undertrained)*

## Compute-optimal training

*(if you have C FLOPs, pick `N` and `D` so that `C ≈ 6·N·D` and `D/N ≈ 20`)*

## Inference-optimal training

*(if the model will serve a lot of tokens, train past Chinchilla-optimal — smaller model, more data, cheaper inference; what Llama 3 and Gemma did)*

## Where scaling laws break

*(emergent capabilities at thresholds; data quality dominates at the small end; reasoning/RLVR doesn't follow pretraining laws)*

## Test-time compute scaling

*(o-series and R1: a separate scaling axis where more thinking tokens → better answers; trades compute at inference for fewer training params)*

## What this implies for the next few years

*(data wall, synthetic data, RL post-training as the new scaling axis; compute-optimal frontier shifting fast)*

## Resources

- [Kaplan et al. — Scaling Laws](https://arxiv.org/abs/2001.08361)
- [Chinchilla paper](https://arxiv.org/abs/2203.15556)

## Notes

*(none yet)*
