---
title: Interpretability
date_added: 2026-05-02
---

# Interpretability

Understanding what a model is *doing* internally, not just what it outputs. Long-term hope for safety; near-term mostly research.

## Levels

*(behavioral — what does it output? mechanistic — what circuits compute it? developmental — how did training produce this?)*

## Mechanistic interpretability

*(reverse-engineering circuits inside transformers; attention heads doing specific operations; "induction heads" as a worked example)*

## Sparse autoencoders (SAEs)

*(learn an overcomplete sparse basis over hidden states; features become more interpretable than raw neurons; the hot 2024–2025 direction)*

## Anthropic Circuits / Features

*(scaling SAE features to frontier models; "Scaling Monosemanticity"; feature steering, ablation, jailbreak-relevant features)*

## Probing

*(train classifiers on hidden states for linguistic/factual properties; older technique; useful but loose)*

## Activation steering

*(add a direction in activation space at inference to bias behavior; "refuse less", "be more honest"; mostly research toy now)*

## What it can't do (yet)

*(prove safety; provide auditable reasoning; interpret RL'd reasoning models; scale to frontier without massive compute)*

## Why it might matter for alignment

*(detect deception, identify mesa-objectives, evaluate trustworthiness beyond behavior; bet that behavioral evals run out before capability does)*

## Resources

- [Distill — Circuits](https://distill.pub/2020/circuits/)
- [Anthropic — Scaling Monosemanticity](https://transformer-circuits.pub/2024/scaling-monosemanticity/)

## Notes

*(none yet)*
