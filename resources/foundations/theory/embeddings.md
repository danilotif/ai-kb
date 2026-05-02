---
title: Embeddings
date_added: 2026-05-02
---

# Embeddings

Dense vector representations of text. The substrate under retrieval, clustering, semantic search, and most "RAG" stacks.

## What an embedding is

*(a fixed-dim vector where similar inputs land near each other; "near" usually meaning cosine similarity)*

## How they're trained

*(contrastive learning on pairs: pull positives together, push negatives apart; in-batch negatives, hard negatives)*

## Training objectives

*(InfoNCE, triplet loss, multi-positive contrastive, margin-based losses)*

## Sentence vs document vs passage

*(scope of what's encoded; sliding-window strategies for long documents)*

## Bi-encoders vs cross-encoders

*(bi-encoder: encode independently, fast at scale; cross-encoder: encode together with attention, slow but accurate; rerankers are cross-encoders)*

## Dimensionality

*(common 384, 768, 1024, 1536, 3072; Matryoshka embeddings let you truncate without retraining)*

## Specializing embeddings

*(domain fine-tuning, instruction-tuned embeddings (E5-instruct, BGE), task-prefixed prompts)*

## Evaluating embeddings

*(MTEB benchmark, retrieval@k on your own data, downstream task performance is the only one that matters)*

## Resources

- [MTEB](https://huggingface.co/spaces/mteb/leaderboard)
- [SBERT](https://www.sbert.net)

## Notes

*(none yet)*
