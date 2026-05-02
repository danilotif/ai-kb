---
title: Prompt engineering — overview
date_added: 2026-05-01
---

# Prompt engineering

What's actually a robust technique vs a folk remedy. The taxonomy of prompt patterns and what each one buys you.

## The system prompt

*(role, capabilities, hard rules; usually the most cache-friendly portion; what to put here vs in user turn)*

## Few-shot

*(when examples beat zero-shot, when they hurt, format matters more than count)*

## Chain-of-thought

*(eliciting intermediate reasoning; built-in for reasoning models; for non-reasoning models still useful for hard problems)*

## Structured output

*(JSON mode, JSON schema, tool-call hijacking for structured extraction; trade-off with capability)*

## Format / role / examples (FRE)

*(simple framework: state the role, the format, give examples; covers most narrow tasks)*

## Anti-patterns

*(pleading, threats, "you are an expert" filler; redundant safety reminders; overstuffed system prompts)*

## Prompt caching strategy

*(stable preamble first → variable user content last; how prompt cache hits cost ~10% of fresh tokens)*

## Jailbreak defenses

*(layered: prompt-level rules, output filters, classifier guardrails; assume prompt-only defenses leak)*

## Eval-driven prompting

*(treat prompt as code; run a test set on each change; small wins compound)*

## Resources

- [Anthropic prompting docs](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [OpenAI prompting guide](https://platform.openai.com/docs/guides/prompt-engineering)

## Notes

*(stub — replace with study content)*
