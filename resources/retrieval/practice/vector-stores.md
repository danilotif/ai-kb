---
title: Vector stores
date_added: 2026-05-02
---

# Vector stores

Where embedded chunks live. Choice depends on scale, ops surface, and whether you want vector-only or full-text+vector.

## The options

*(pgvector, Qdrant, Weaviate, LanceDB, Milvus, Pinecone, Chroma, Vespa, Elasticsearch dense_vector, Turbopuffer)*

## pgvector

*(Postgres extension; HNSW or IVFFlat; great when you already have Postgres; metadata filtering is just SQL)*

## Qdrant / Weaviate

*(dedicated; HNSW; rich filtering; both have managed offerings; lots of provider features)*

## LanceDB / Chroma

*(file-based, embedded; great for prototyping or small apps; LanceDB more production-ready)*

## Pinecone

*(closed managed service; was the default for a while; pricey at scale; serverless tier now reasonable)*

## Elasticsearch / OpenSearch

*(when you need lexical + vector + filters in one place; mature ops story; vector quality lags dedicated stores)*

## Index types

*(HNSW vs IVF vs flat; recall vs latency vs build time; HNSW dominates for sub-100M scale)*

## Capacity planning

*(memory ≈ vectors × dim × 4 bytes for fp32 HNSW; quantization (int8, binary) cuts that 4–32×)*

## Choosing

*(small/prototype → LanceDB; existing Postgres → pgvector; hybrid lexical+vector → ES/OS or Qdrant; massive scale → Vespa or Milvus)*

## Resources

- [pgvector](https://github.com/pgvector/pgvector)
- [Qdrant docs](https://qdrant.tech/documentation/)

## Notes

*(none yet)*
