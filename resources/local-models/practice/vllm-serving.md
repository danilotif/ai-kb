---
title: Serving with vLLM
date_added: 2026-05-01
---

# Serving with vLLM

When more than one user, agent, or batch job will hit the box at the same time. PagedAttention + continuous batching = high throughput on Nvidia hardware.

## Install

*(pip install vllm, CUDA version pinning, Docker image, ROCm path)*

## Launching the OpenAI-compatible server

*(`vllm serve <hf-id>`, `--quantization`, `--max-model-len`, `--gpu-memory-utilization`)*

## Quantization options

*(AWQ vs GPTQ vs FP8 vs BitsAndBytes, when each is worth it)*

## Tensor parallel across GPUs

*(`--tensor-parallel-size`, NVLink vs PCIe, layer split for non-NVLink rigs)*

## Throughput tuning

*(`--max-num-seqs`, prefix caching, chunked prefill, swap-out behaviour)*

## Hitting it from a client

*(OpenAI SDK pointed at the local URL, streaming, function calling, structured output)*

## Observability

*(Prometheus metrics, request logs, token throughput dashboards)*

## Resources

- [vLLM docs](https://docs.vllm.ai)

## Notes

*(none yet)*
