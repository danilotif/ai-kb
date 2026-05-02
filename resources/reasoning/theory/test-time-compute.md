---
title: Test-time compute
date_added: 2026-05-02
---

# Test-time compute

Spending inference-time compute to get a better answer from the same weights. The new scaling axis.

## The basic claim

*(scaling laws hold at training; a separate, near-orthogonal scaling law holds at inference; both can be combined)*

## Strategies

*(longer chain-of-thought, best-of-N with verifier, majority vote, beam search over reasoning, MCTS-style tree search)*

## Best-of-N

*(sample N candidates, pick best by verifier or judge; cheap, parallelizable, strong baseline)*

## Self-consistency

*(majority vote over sampled chains-of-thought; works well for math/short-answer; degrades for open-ended)*

## Verifier-guided search

*(train a verifier on (problem, partial-trace, correctness); search over partial traces; expensive but powerful)*

## Tree of thoughts

*(explicit branching + backtracking; works on puzzles; high overhead in tokens)*

## Trade-offs

*(linear cost in N; logarithmic-ish reward in N; budget by task value)*

## How frontier models bake it in

*(o-series and R1 trained to produce one long, structured chain-of-thought; "test-time compute" is mostly internalized into one big rollout)*

## Resources

- [Scaling Test-Time Compute (DeepMind)](https://arxiv.org/abs/2408.03314)

## Notes

*(none yet)*
