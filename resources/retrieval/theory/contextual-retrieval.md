---
title: Contextual retrieval
date_added: 2026-05-02
---

# Contextual retrieval

Anthropic's 2024 technique: prepend each chunk with a short LLM-generated context blurb before embedding. ~50% retrieval-error reduction, almost free at query time.

## The technique

*(for each chunk, prompt a cheap model with the whole document and ask for a one-paragraph "what this chunk is about within the larger doc"; embed and index that prefixed chunk)*

## Why it works

*(decouples the local content from the global context the chunk depends on — section headings, document subject, prior definitions)*

## Cost

*(one-time per chunk at ingestion; with prompt caching of the parent document, cheap; no extra cost at query time)*

## Combine with reranking

*(contextual retrieval + reranker stacks; reported ~67% error reduction in original blog post)*

## When it pays off

*(long documents with many chunks that share context; legal, medical, technical docs; less effective on short discrete documents)*

## Implementation notes

*(re-ingest needed when documents change; prompt-cache the parent doc; cheap small model is fine, this is a context-extraction task)*

## Resources

- [Anthropic — Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)

## Notes

*(none yet)*
