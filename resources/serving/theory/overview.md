---
title: Serving & inference — overview
date_added: 2026-05-01
---

# Serving & inference

Running models *for many users at once*, optimized for throughput, latency, and cost. The local-models category covers single-user setups; this is the production layer.

## What changes vs single-user

*(batching becomes the central trick; KV cache management dominates memory; tail latency matters more than mean; observability is non-negotiable)*

## The metrics

*(time-to-first-token (TTFT), inter-token latency (ITL), throughput (tokens/sec aggregate), cost per million tokens; trade-offs between them)*

## The core tricks

*(continuous batching, paged KV cache, prefix caching, speculative decoding, quantization, tensor parallelism)*

## Engines

*(vLLM, TGI, TensorRT-LLM, SGLang, LMDeploy; each opinionated about which trick to push hardest)*

## Hosting patterns

*(self-host on H100/B200; serverless via Modal/Replicate; closed APIs via OpenAI/Anthropic/Bedrock; pick by volume + latency + privacy)*

## Capacity planning

*(QPS × tokens-per-request × cost-per-million-tokens; KV-cache memory budget; concurrency cap before latency degrades)*

## Observability

*(Prometheus metrics from vLLM/TGI; per-request traces; queue depth, batch size, GPU utilization, KV-cache hit rate)*

## Resources

- [vLLM docs](https://docs.vllm.ai)
- [TGI docs](https://huggingface.co/docs/text-generation-inference)

## Notes

*(stub — replace with study content)*
