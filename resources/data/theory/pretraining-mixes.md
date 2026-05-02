---
title: Pretraining mixes
date_added: 2026-05-02
---

# Pretraining mixes

What goes into a frontier-model training corpus and in what proportions. Mostly inferred — labs disclose more for open models than closed ones.

## The classic recipe

*(web 60–80%, code 10–20%, books 5–10%, papers/Wikipedia/Q&A as smaller high-quality slices)*

## Tokens vs documents vs domains

*(token-budget thinking: how many tokens of code is "a lot"; deduplication's effect on real token count)*

## Mixing weights

*(uniform vs upweighted high-quality; data-domain RL; doremi-style auto-tuning)*

## Multi-epoch training

*(when repeats help, when they hurt; quality-conditional repetition)*

## Documented mixes

*(OLMo / Dolma; Llama 2/3 disclosure; DeepSeek V3 disclosure; what GPT-4/Claude don't say)*

## Code as a mix ingredient

*(why code mix improves reasoning; sweet spot percentages; dedicated code passes)*

## Multilingual

*(English-heavy default; what changes with explicit multilingual upweighting; tokenizer implications)*

## Resources

- [Dolma paper](https://arxiv.org/abs/2402.00159)
- [Llama 3 paper](https://arxiv.org/abs/2407.21783)
- [DoReMi](https://arxiv.org/abs/2305.10429)

## Notes

*(none yet)*
