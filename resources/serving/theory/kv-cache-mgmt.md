---
title: KV-cache management at scale
date_added: 2026-05-02
---

# KV-cache management at scale

The KV cache is the single biggest determinant of how many concurrent users a server can handle. Managing it is most of what a serving engine does.

## What's in the KV cache

*(per-token, per-layer K and V tensors stored across the whole sequence so attention doesn't recompute past tokens)*

## Memory pressure

*(at 128K context Llama 70B → ~20 GB of KV cache; bigger than the model in some quantizations)*

## Naive contiguous allocation

*(reserve worst-case max-length per request → massive fragmentation; what every framework did before vLLM)*

## PagedAttention

*(KV cache split into fixed-size blocks; sequences hold lists of block ids; no fragmentation; share blocks between sequences with same prefix)*

## Prefix caching

*(detect shared prompt prefixes across requests; reuse KV blocks; huge win for systems with shared system prompts (chat apps, agents))*

## RadixAttention (SGLang)

*(prefix-tree of cached blocks; cross-request KV reuse; bigger speedup than vLLM's basic prefix cache when prefixes overlap heavily)*

## KV cache quantization

*(Q8 → halves memory, near-zero quality cost; Q4 → quarters, small quality cost; supported in vLLM, llama.cpp, TGI)*

## Eviction & swapping

*(LRU eviction when cache full; some engines swap to CPU memory rather than evict; trade-off: slow recompute vs slow PCIe)*

## Resources

- [PagedAttention paper](https://arxiv.org/abs/2309.06180)
- [SGLang RadixAttention](https://arxiv.org/abs/2312.07104)

## Notes

*(none yet)*
