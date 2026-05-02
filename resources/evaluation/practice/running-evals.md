---
title: Running evals
date_added: 2026-05-02
---

# Running evals

Practical workflow: write a small custom eval, run it across model/prompt versions, read the result.

## Tools

*(Inspect AI, lm-evaluation-harness, OpenAI Evals, promptfoo, simple custom scripts)*

## Inspect AI

*(task → solver → scorer pattern; built-in samplers, parallelism, caching; logs are diff-able)*

## lm-evaluation-harness

*(when to use it: standard public benchmarks for open models; what it's bad at: custom rubrics, agent traces)*

## promptfoo

*(YAML-driven, side-by-side comparison view, good for prompt iteration on closed APIs)*

## Rolling your own

*(jsonl of cases → call model → score with regex/exact-match/judge → aggregate; <100 lines)*

## Caching

*(deterministic seed where possible, response cache to avoid re-paying for re-runs, version everything)*

## Comparing two versions

*(paired runs over the same cases, paired t-test or McNemar, never compare raw averages from different sample sets)*

## CI integration

*(eval on PRs, threshold guards, flake handling)*

## Resources

- [Inspect AI](https://inspect.ai-safety-institute.org.uk)
- [lm-eval-harness](https://github.com/EleutherAI/lm-evaluation-harness)
- [promptfoo](https://www.promptfoo.dev)

## Notes

*(none yet)*
