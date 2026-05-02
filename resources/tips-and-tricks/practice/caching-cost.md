---
title: Caching & cost optimization
date_added: 2026-04-18
---

# Caching & cost optimization

Practical levers to cut inference cost. Mostly free if you structure prompts right.

## Prompt caching

*(stable preamble first, variable user content last; cache hits ~10% of fresh-token cost on Anthropic, ~50% on OpenAI; 5-minute TTL on Anthropic)*

## What to cache

*(system prompt, large reference docs, few-shot examples, tool schemas; anything reused across calls in a session)*

## Cache placement rules

*(Anthropic: explicit `cache_control` breakpoints; OpenAI: automatic; in both, content order is what matters)*

## Batch APIs

*(50% off async; perfect for offline jobs (scoring, summarization, eval runs); 24h SLA)*

## Model tier selection

*(Haiku for simple steps, Sonnet for default, Opus only when needed; tier-by-step in pipelines)*

## Output token budget

*(output is 4–5× input price; cap `max_tokens`, ask for terse answers, structured output)*

## Reasoning model thinking budget

*(thinking is output tokens; budget by task; don't use reasoning for tasks that don't need it)*

## Streaming + early stop

*(stop generating once you have what you need; useful for structured outputs and tool-call patterns)*

## Track cost

*(per-feature dashboards; logging request/response token counts; surprise bills come from agent loops, not chat)*

## Resources

- [Anthropic — Prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [OpenAI prompt caching](https://platform.openai.com/docs/guides/prompt-caching)

## Notes

*(none yet)*
