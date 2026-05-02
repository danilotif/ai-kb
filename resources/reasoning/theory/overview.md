---
title: Reasoning — overview
date_added: 2026-05-01
---

# Reasoning

The shift from "predict the next token" to "spend compute thinking before answering". A new scaling axis on top of pretraining.

## What "reasoning" buys

*(better hard-problem performance; more reliable multi-step output; explicit traces you can debug)*

## Test-time compute

*(spend more tokens at inference for better answers; new scaling law dimension; o-series and R1 are the canonical examples)*

## Approaches

*(longer chain-of-thought; sampling + verifier; tree-of-thought search; explicit RL-on-reasoning)*

## RL with verifiable rewards

*(math/code where correctness is checkable; train the model to produce reasoning that leads to correct answers; less noisy than human preference)*

## The reasoning model lineup

*(OpenAI o-series, DeepSeek-R1.x, Qwen 3 thinking, Anthropic extended thinking, Gemini 3 thinking)*

## When reasoning helps

*(math, code, logic puzzles, multi-step planning, agentic decision making)*

## When it doesn't

*(short factual lookup, formatting, style — the overhead is wasted; even hurts some chat tasks)*

## Cost trade-off

*(thinking tokens are output tokens, often 5–10× the answer length; budget thinking by task difficulty)*

## Resources

- [DeepSeek-R1 paper](https://arxiv.org/abs/2501.12948)
- [OpenAI o1 system card](https://openai.com/index/openai-o1-system-card/)

## Notes

*(stub — replace with study content)*
