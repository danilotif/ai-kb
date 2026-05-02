---
title: Dedup, filtering, and quality
date_added: 2026-05-02
---

# Dedup, filtering, and quality

The pipeline between "scraped the internet" and "ready to train". Filters are where bias and capability gaps get baked in.

## Why dedup matters

*(memorization risk, wasted compute, eval contamination)*

## Dedup techniques

*(exact hashing, MinHash + LSH, near-dup at document and substring level)*

## Quality filtering

*(classifier-based: train on "good" vs "bad"; rule-based: length, perplexity, repetition; model-scored quality)*

## Toxicity / safety filters

*(what a "safety filter" actually removes; the trade-off with capability)*

## PII and sensitive content

*(scrubbing patterns, named-entity removal, partial-redaction strategies)*

## Eval contamination

*(decontamination against known benchmark sets; why it's never fully solved; n-gram overlap detection)*

## Domain balancing

*(after filtering, distribution shifts; deliberate re-balancing of small high-value domains)*

## Resources

- [Deduplicating Training Data Makes Language Models Better](https://arxiv.org/abs/2107.06499)
- [SemDeDup](https://arxiv.org/abs/2303.09540)

## Notes

*(none yet)*
