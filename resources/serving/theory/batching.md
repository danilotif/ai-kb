---
title: Batching & continuous batching
date_added: 2026-05-02
---

# Batching & continuous batching

The single most important trick in LLM serving. Batching turns latency-bound generation into throughput-bound generation.

## Static batching

*(wait for N requests, run them together, return all when slowest finishes; bad: heads-of-line blocking, idle slots)*

## Continuous (in-flight) batching

*(token-level scheduling: as soon as a request finishes, slot in the next one; pioneered by Orca/vLLM; standard now)*

## Prefill vs decode

*(prefill: parallel over input tokens, compute-bound; decode: sequential per token, memory-bandwidth-bound; very different cost profiles)*

## Chunked prefill

*(break long prefills into chunks interleaved with ongoing decode; smooths out latency spikes from one long prompt)*

## Batch size limits

*(KV cache memory caps concurrent sequences; quantizing the cache lets you fit more; long contexts cap batch size hard)*

## Throughput vs latency knob

*(bigger batch → higher throughput, slightly higher per-request latency; sweet spot depends on SLA)*

## Speculative decoding integration

*(compatible with continuous batching but accounting gets tricky; reduces decode time per request, can hurt batch throughput)*

## Resources

- [Orca (continuous batching) paper](https://www.usenix.org/conference/osdi22/presentation/yu)
- [vLLM blog on continuous batching](https://blog.vllm.ai)

## Notes

*(none yet)*
