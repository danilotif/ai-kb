---
title: Text Generation Inference (TGI)
date_added: 2026-05-02
---

# Text Generation Inference (TGI)

Hugging Face's serving framework. The Rust/Python production engine HF runs Inference Endpoints on.

## Install / launch

*(Docker image is the standard path; `docker run ghcr.io/huggingface/text-generation-inference --model-id <hf-id>`)*

## Sharded across GPUs

*(`--num-shard N` for tensor parallel; built-in NCCL setup)*

## Quantization

*(supports `bitsandbytes`, GPTQ, AWQ, FP8, EETQ; same model card → many runtime options)*

## OpenAI-compatible endpoints

*(`/v1/chat/completions`, `/v1/completions`, plus native `/generate`, `/generate_stream`)*

## Configuration

*(env vars or CLI flags; `MAX_INPUT_LENGTH`, `MAX_TOTAL_TOKENS`, `MAX_BATCH_PREFILL_TOKENS`)*

## Observability

*(Prometheus metrics, OpenTelemetry traces, structured logs out of the box)*

## TGI vs vLLM

*(TGI: easier ops, opinionated, good defaults, slightly behind on throughput. vLLM: more knobs, faster bleeding edge, more setup)*

## Inference Endpoints

*(HF managed offering built on TGI; one-click deploy; useful for low-volume production)*

## Resources

- [TGI docs](https://huggingface.co/docs/text-generation-inference)
- [TGI GitHub](https://github.com/huggingface/text-generation-inference)

## Notes

*(none yet)*
