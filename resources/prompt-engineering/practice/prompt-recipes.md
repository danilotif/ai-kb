---
title: Prompt recipes
date_added: 2026-05-02
---

# Prompt recipes

Concrete templates for common tasks. Copy-paste starters; adapt to your data.

## Classification

*(system: role + label set + tie-breaker rule; user: input; structured output with confidence)*

## Extraction

*(schema-first: define JSON schema, give 2–3 examples, force tool-call; validate with Pydantic)*

## Summarization

*(specify length, audience, what to keep / drop; ask for bullets if structure helps)*

## Rewriting / style transfer

*(target style as system prompt; original as user; constraints (preserve facts, length); often few-shot helps)*

## Multi-step reasoning

*(non-thinking model: ask for plan first then answer; thinking model: just ask the hard question)*

## Tool use

*(tool descriptions with examples; "if you don't know, ask, don't guess"; structured error handling)*

## RAG response

*(system: cite from sources only; user: question + retrieved chunks tagged with ids; ask for inline citations)*

## Eval / judge

*(rubric in system, candidate(s) in user, force pairwise output; randomize order to avoid position bias)*

## Resources

- [Anthropic prompt library](https://docs.anthropic.com/en/prompt-library)

## Notes

*(none yet)*
