---
title: Reranking
date_added: 2026-05-02
---

# Reranking

A second-stage scorer that reorders the top-K from initial retrieval. The biggest single quality lever in most RAG stacks.

## Why rerank

*(bi-encoder retrieval is fast but lossy; a stronger model on top-K cleans up the order without changing the candidate set)*

## Cross-encoder rerankers

*(query and doc encoded jointly with attention; expensive per pair, accurate; bge-reranker, Cohere Rerank, ColBERT-as-reranker)*

## LLM-as-reranker

*(prompt a strong model to score or pairwise-rank top-K; expensive but flexible; useful for nuanced criteria)*

## Reciprocal rank fusion (RRF)

*(combine multiple retrievers (vector + BM25 + reranker) by summing 1/(k+rank); tuning-free, robust)*

## Latency budget

*(rerank top 50 → 100 typically; cross-encoder ~10–50ms per pair on GPU; LLM rerank ~100ms–1s)*

## When rerank doesn't help

*(when the initial retriever is already strong; when the corpus is small; when reranker is trained on a different domain)*

## Open vs closed rerankers

*(BGE, BCE, Cohere Rerank, Voyage Rerank; Cohere/Voyage closed but strongest; BGE strongest open)*

## Resources

- [Cohere Rerank docs](https://docs.cohere.com/docs/rerank)
- [BGE reranker on HF](https://huggingface.co/BAAI/bge-reranker-v2-m3)

## Notes

*(none yet)*
