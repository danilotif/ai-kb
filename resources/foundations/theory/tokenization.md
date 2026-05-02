---
title: Tokenization & BPE
date_added: 2026-01-15
---

# Tokenization & BPE

How text becomes ids. Tokenizer choices show up everywhere downstream — speed, multilingual quality, cost.

## Why subword

*(word-level → OOV explosion; char-level → long sequences; subword splits the difference)*

## BPE

*(start from bytes/chars, greedily merge most-frequent pairs until vocab full; deterministic given training corpus)*

## Variants

*(byte-level BPE (GPT), WordPiece (BERT), Unigram/SentencePiece (T5, Llama))*

## Vocabulary size

*(typical 32k–128k; bigger → fewer tokens per text but bigger embedding table; trade-off with throughput)*

## Tokenizer effects

*(non-English text uses 2–4× more tokens; code tokenizes denser with code-aware vocab; why pricing varies by language)*

## Special tokens & chat templates

*(BOS, EOS, system/user/assistant role markers; mismatched templates → garbage output)*

## Tokenizer drift across model versions

*(why you can't reuse a tokenizer across families; why a new tokenizer = wait for runtime support)*

## Resources

- [HF Tokenizers course](https://huggingface.co/learn/nlp-course/chapter6)
- [SentencePiece paper](https://arxiv.org/abs/1808.06226)
- [Karpathy — Let's build the GPT tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE)

## Notes

*(none yet)*
