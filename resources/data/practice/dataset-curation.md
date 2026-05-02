---
title: Dataset curation
date_added: 2026-05-02
---

# Dataset curation

How to actually build a small, high-quality dataset for fine-tuning or eval. Practical workflow, not the frontier-scale pipeline.

## Define the target

*(task spec, ideal input/output shapes, distribution of edge cases)*

## Source

*(real user logs, synthetic generation, public datasets, manual writing; mix and label provenance)*

## Format

*(jsonl, parquet, HuggingFace datasets format; chat template normalization)*

## Clean & dedup

*(quick dedup on input hash, near-dup with MinHash, length filtering, language detection)*

## Quality pass

*(sample-and-review, classifier scoring, LLM-as-judge for binary quality calls)*

## Splits

*(train/dev/test discipline; group splits if multiple rows share a source; never let the test bleed into train)*

## Versioning

*(commit datasets to a registry, tag versions with the eval that produced them)*

## Tools

*(HF `datasets`, Argilla for human review, fastdup, simhash libs)*

## Resources

- [HF datasets](https://huggingface.co/docs/datasets)
- [Argilla](https://argilla.io)

## Notes

*(none yet)*
