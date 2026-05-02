---
title: Building a RAG system
date_added: 2026-05-02
---

# Building a RAG system

End-to-end recipe: from a folder of docs to a working chat-with-your-docs.

## Decide if you need RAG

*(small corpus → just paste into context; static reference → fine-tune is also an option; check baseline before building infrastructure)*

## Ingest

*(loaders by file type; preserve structure (headings, tables); de-noise (boilerplate, navigation, footers))*

## Chunk

*(start with recursive 500–1500 token chunks with 100–200 overlap; switch to structure-aware chunking once it matters)*

## Embed

*(a strong general embedding model (text-embedding-3, voyage-3, BGE-large); store vectors + chunk text + source metadata)*

## Index

*(start with a vector store with metadata filters; pgvector for postgres-native; Qdrant/Weaviate/LanceDB for dedicated)*

## Retrieve

*(vector top-K (K=20–50); add BM25 top-K if lexical matters; RRF combine)*

## Rerank

*(cross-encoder reranker on combined top-K; keep top 5–10 for the prompt)*

## Prompt

*(system: cite-from-sources rules; user: question + sources tagged with ids; ask for inline citations)*

## Generate & cite

*(strong instruction-following model; structure citations as `[id]`; post-validate citations exist)*

## Evaluate

*(curate ~50 question-answer pairs; track retrieval@k and answer faithfulness; iterate on the chunker first, then reranker, then prompt)*

## Resources

- [LlamaIndex tutorials](https://docs.llamaindex.ai)
- [Anthropic Cookbook RAG](https://github.com/anthropics/anthropic-cookbook)

## Notes

*(none yet)*
