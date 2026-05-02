---
title: LLM-as-judge
date_added: 2026-05-02
---

# LLM-as-judge

Using a strong model to grade outputs. When it's a useful proxy, when it's a load-bearing lie.

## When it works

*(format compliance, factual lookup, well-defined rubrics, pairwise preference on coherent text)*

## When it doesn't

*(subjective quality, domain expertise, anything where the judge can't actually verify)*

## Bias to know about

*(position bias, length bias, self-preference, sycophancy, flattering style over correctness)*

## Mitigations

*(swap order, randomize, use a different model than the one being evaluated, ensemble across judges)*

## Pairwise vs absolute

*(pairwise is more reliable; absolute scores collapse into 7/10 mush)*

## Calibration against humans

*(Cohen's kappa or simple agreement; sample-and-check periodically; never deploy without ever looking)*

## Cost vs reliability

*(reasoning models cost 10× but agree with humans much better; judging is the right place to spend cycles)*

## Resources

- [Judging LLM-as-a-Judge](https://arxiv.org/abs/2306.05685)

## Notes

*(none yet)*
