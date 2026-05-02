---
title: Structured output
date_added: 2026-05-02
---

# Structured output

Getting machine-parseable JSON (or other formats) out reliably. Three layers — prompt, decoding, and validation.

## Prompt-only

*(describe the schema in the prompt + few-shot; works on any model; brittle without retries)*

## Provider JSON mode

*(OpenAI `response_format=json_object`; valid JSON guaranteed but content not constrained)*

## Provider JSON Schema / Structured Outputs

*(OpenAI Structured Outputs, Anthropic via tool-call schema, Gemini's `responseSchema`; constrained decoding so output is valid against schema)*

## Tool-call hijack pattern

*(define a tool whose argument schema is your output; force the model to call it; works across providers including those without first-class structured output)*

## Local: constrained generation

*(grammar-guided sampling in llama.cpp, vLLM `guided_json`, Outlines, LMQL; hard guarantees, some quality cost)*

## Trade-offs

*(more constraint → more reliable parse, sometimes degraded quality; complex schemas can overfit responses; nested unions tricky)*

## Validation layer

*(always parse + Pydantic/Zod validate even with provider guarantees; retry on failure; structured errors back to the model for self-correction)*

## When to use which

*(closed APIs: provider Structured Outputs first; local: constrained decoding via runtime; everywhere: validation + retry safety net)*

## Resources

- [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [Outlines](https://github.com/dottxt-ai/outlines)
- [Instructor](https://github.com/instructor-ai/instructor)

## Notes

*(none yet)*
