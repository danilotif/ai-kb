---
title: Tool-use patterns
date_added: 2026-05-02
---

# Tool-use patterns

Designing tools the model will actually use correctly. Most agent failures are tool-design failures.

## Tool schema basics

*(name, description, JSON schema params; what fields the model actually reads vs ignores)*

## Naming and descriptions

*(verbs not nouns; what each tool does AND when to use it; describe failure modes the model should anticipate)*

## Granularity

*(one big "do_thing" vs many small focused tools; bias small until you see the model thrash)*

## Parallel tool calls

*(when the model can/should batch; structuring independent reads as a single turn)*

## Error handling

*(return structured errors with hints; don't just throw; let the model self-correct)*

## Idempotency and side effects

*(read-only vs write tools; confirmation prompts; making destructive tools reversible)*

## Common pitfalls

*(too many tools in context, ambiguous descriptions, silent truncation of large outputs, missing examples)*

## Resources

- [Anthropic tool use guide](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)

## Notes

*(none yet)*
