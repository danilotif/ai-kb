---
title: Designing reliable evals
date_added: 2026-04-22
---

# Designing reliable evals

Most evals are wrong in ways that don't show up until prod. This page is the discipline that makes them less wrong.

## What an eval is for

*(measure capability change between two model/prompt versions; detect regressions; not "is the model good")*

## Golden sets

*(small, hand-curated, high-confidence labels; size in dozens, not thousands; the eval that catches real bugs)*

## LLM-as-judge

*(when it's reasonable, when it isn't; pairwise vs absolute; calibration against humans)*

## Pairwise vs absolute scoring

*(humans agree on "A is better than B" more than on "A is 7/10"; bias toward pairwise where possible)*

## Eval-driven development

*(write the eval first, watch it improve; fast inner loop; rejection-resistant prompts)*

## Common pitfalls

*(contamination, tiny test sets that move with sampling noise, overfit to the eval prompt format, judge-model self-preference)*

## Statistical hygiene

*(confidence intervals, paired tests, n big enough to detect the effect you care about)*

## Resources

- [Anthropic — Building evals](https://docs.anthropic.com/en/docs/test-and-evaluate/develop-evals)
- [Inspect AI](https://inspect.ai-safety-institute.org.uk)

## Notes

*(none yet)*
