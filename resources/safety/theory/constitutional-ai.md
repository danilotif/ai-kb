---
title: Constitutional AI
date_added: 2026-05-02
---

# Constitutional AI

Anthropic's training technique that uses an explicit set of principles ("constitution") plus AI-generated feedback to align models, reducing dependence on human preference labels.

## The idea

*(give the model a written set of principles; have a model critique its own outputs against them; train on the revised outputs)*

## Two phases

*(Supervised: model self-critiques and self-revises responses against the constitution. RL: model labels preferences against the constitution; standard RL on those labels (RLAIF))*

## Why it matters

*(reduces volume of human feedback needed; principles are auditable in a way that thousands of preference labels aren't; the constitution can be debated and updated explicitly)*

## What's in the Anthropic constitution

*(harm avoidance, helpfulness, honesty, anti-discrimination, privacy; many sourced from UN Declaration of Human Rights and Apple ToS as a starting point)*

## Strengths

*(transparency about values; cheap to update; consistent application across many cases)*

## Limitations

*(principles still need careful drafting; AI-feedback inherits AI biases; doesn't solve hard cases that humans disagree on)*

## Collective Constitutional AI

*(experiments with publicly-sourced principles; democratic input into model values)*

## Resources

- [Anthropic — Constitutional AI paper](https://arxiv.org/abs/2212.08073)
- [Collective CAI](https://www.anthropic.com/news/collective-constitutional-ai-aligning-a-language-model-with-public-input)

## Notes

*(none yet)*
