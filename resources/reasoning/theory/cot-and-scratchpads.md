---
title: Chain-of-thought & scratchpads
date_added: 2026-05-02
---

# Chain-of-thought & scratchpads

Letting the model think out loud before answering. Old technique, still useful, partly automated by reasoning models.

## What CoT does

*(unrolls intermediate steps so the model can attend back to its own work; converts hard one-shot problems into easier multi-step ones)*

## Zero-shot vs few-shot CoT

*("Let's think step by step" vs explicit worked examples; few-shot wins on hard tasks, zero-shot mostly enough for medium)*

## Hidden vs visible

*(some providers hide reasoning tokens (o-series, Anthropic extended thinking); others expose them; products may want hidden, debuggers want visible)*

## Scratchpads

*(structured thinking area separate from output; write plan, then execute; useful in agent loops)*

## Limitations

*(CoT can confidently rationalize wrong answers; longer doesn't always mean better; prompt-only CoT plateaus)*

## When reasoning models obsolete CoT prompting

*(if the model is trained for thinking, just ask the question; explicit "think step by step" can hurt)*

## Faithfulness

*(CoT may not reflect the actual computation; published research showing models reach answers via different paths than they explain)*

## Resources

- [Chain-of-Thought Prompting](https://arxiv.org/abs/2201.11903)
- [Faithfulness paper](https://arxiv.org/abs/2305.04388)

## Notes

*(none yet)*
