---
title: Using thinking models
date_added: 2026-05-02
---

# Using thinking models

How to actually call reasoning models in production. APIs, budgets, when not to use them.

## Anthropic extended thinking

*(`thinking` parameter, `budget_tokens`; thinking + tool use; visible vs hidden thinking; pricing of thinking tokens)*

## OpenAI reasoning effort

*(`reasoning.effort = "low" | "medium" | "high"`; o-series in Responses API; thinking tokens billed but not returned)*

## Gemini thinking

*(thinking enabled by default on 3.x Pro; thinking budget knob; visible chain-of-thought option)*

## Open reasoning models

*(DeepSeek-R1, Qwen 3 thinking, QwQ; chat templates that wrap reasoning + answer; how each runtime exposes them)*

## Budget tuning

*(low budget for medium tasks, high budget only when needed; thinking tokens are output tokens — they cost real money)*

## What to send vs not send

*(don't put long context in thinking-budget territory; keep retrieved context short; ask precisely)*

## When NOT to use reasoning models

*(formatting tasks, classification, summarization, anything time-sensitive; the overhead is wasted)*

## Latency

*(first-token latency of reasoning models is dominated by thinking; for chat UX, stream "thinking..." while waiting)*

## Resources

- [Anthropic extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
- [OpenAI reasoning](https://platform.openai.com/docs/guides/reasoning)

## Notes

*(none yet)*
