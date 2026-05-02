---
title: Prompt engineering patterns
date_added: 2026-02-12
---

# Prompt engineering patterns

Catch-all of high-mileage patterns. Deeper taxonomy lives under `prompt-engineering/`; this is the practical cheat sheet.

## Role + format + examples

*(state who the model is, what shape the output takes, and 1–3 examples; covers most narrow tasks)*

## Few-shot when zero-shot is shaky

*(2–5 examples is usually enough; format matters more than count; mismatched examples hurt)*

## "Think before answering"

*(non-reasoning models: ask for plan first, then answer; reasoning models: just ask, don't double up)*

## Structured output

*(JSON schema or tool-call hijacking; cheaper and more reliable than parsing prose; pointer to prompt-engineering/structured-output.md)*

## Negative instructions

*("don't do X" works less well than "do Y instead"; restate as positive constraints when you can)*

## Self-critique

*(generate → critique against a rubric → revise; useful for quality-sensitive output; cost is worth it for high-stakes)*

## Multi-shot decomposition

*(split a hard task into multiple smaller calls, each cheap; better than one giant prompt for complex pipelines)*

## Fallback prompts

*(if first call fails parse/quality, prompt with the failure + retry; structured errors as model input)*

## Anti-patterns

*(pleading, threats, redundant safety filler, overstuffed system prompt, contradictory instructions)*

## Resources

- [Anthropic prompt library](https://docs.anthropic.com/en/prompt-library)
- [OpenAI prompting guide](https://platform.openai.com/docs/guides/prompt-engineering)

## Notes

*(none yet)*
