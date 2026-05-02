---
title: Retrieval-Augmented Generation
date_added: 2026-03-20
---

# Retrieval-Augmented Generation

Pull relevant context at query time, stuff it into the prompt, generate. The pattern under most "chat with your docs" products.

## When to use RAG

*(static-ish knowledge that doesn't fit in context; freshness requirement; need for citations; large corpus that fine-tuning would be wasteful for)*

## When NOT to use RAG

*(small enough to fit in long context — just prompt-stuff; agents that need tools, not lookup; one-off tasks)*

## Pipeline shape

*(ingest: chunk → embed → index. query: embed → retrieve → optionally rerank → prompt → generate)*

## Chunking

*(fixed-size, recursive, semantic; overlap; preserving structure (headings, tables); the most underrated knob)*

## Embedding & retrieval

*(bi-encoder for retrieval over many docs; cosine similarity; ANN indexes; pointer to embeddings.md)*

## Reranking

*(cross-encoder or strong LLM judge over top-K from retrieval; small reorder, big quality win)*

## Hybrid retrieval

*(BM25 + vector; reciprocal rank fusion; covers cases where lexical match matters)*

## Generation

*(citations baked into prompt format; "answer only from the sources"; refuse if no source supports)*

## Eval

*(retrieval@k, faithfulness, answer correctness; pointer to evaluation/)*

## Failure modes

*(stale index, wrong chunk size, missing reranker, model ignoring sources, hallucinated citations)*

## Resources

- [Anthropic — Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval)
- [Pinecone learn](https://www.pinecone.io/learn/)

## Notes

*(none yet)*
