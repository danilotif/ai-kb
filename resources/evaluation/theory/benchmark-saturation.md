---
title: Benchmark saturation & contamination
date_added: 2026-05-02
---

# Benchmark saturation & contamination

Why public benchmarks decay as signals over time, and what people use instead.

## The lifecycle of a benchmark

*(introduced → predictive → saturated → contaminated → retired; MMLU, HumanEval, GSM8K, SWE-bench Lite all on this curve)*

## Saturation

*(when frontier models cluster at >95%; differences fall inside noise; ceiling effect)*

## Contamination

*(test data leaking into training corpora; n-gram overlap detection; "decontaminated" claims that aren't)*

## Goodharting

*(when chasing the metric stops correlating with the underlying capability; targeted post-training to lift a single benchmark)*

## What replaces saturated benchmarks

*(harder / private benchmarks, dynamic benchmarks, real-task evals, agentic benchmarks like SWE-bench Verified, MMLU-Pro)*

## Live leaderboards vs static benchmarks

*(arena-style preference vs frozen test sets; both have failure modes)*

## Reading benchmark numbers in practice

*(only compare on the same eval harness, same prompt, same date range; treat self-reported numbers skeptically)*

## Resources

- [LMSys Chatbot Arena](https://lmarena.ai)
- [SWE-bench Verified](https://www.swebench.com)
- [MMLU-Pro](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)

## Notes

*(none yet)*
