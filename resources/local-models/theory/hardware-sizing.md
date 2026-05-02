---
title: Hardware sizing & VRAM math
date_added: 2026-05-01
---

# Hardware sizing & VRAM math

The single most useful skill for running models locally is being able to estimate, before downloading anything, whether a given model will fit on your hardware. It's mostly arithmetic.

## What sits in memory at runtime

Three things compete for RAM/VRAM during inference:

- **Weights** — the parameters of the model, scaled by quantization.
- **KV cache** — the cached keys and values from every token generated so far. Grows linearly with context length.
- **Activations + overhead** — temporary tensors per forward pass, plus framework overhead. Usually small (~1–2 GB) but real.

Total ≈ weights + KV cache + ~2 GB.

If any of those blow the budget, you have three escape hatches: a smaller model, a heavier quantization, or a shorter context.

## Weight size

The first-order rule:

- *bytes of weights* ≈ *parameters* × *bits-per-weight* / 8

So a 70B model:

- at `bf16` (16 bpw) → 70 × 2 = **140 GB**
- at `Q8_0` (~8.5 bpw) → ~75 GB
- at `Q5_K_M` (~5.7 bpw) → ~50 GB
- at `Q4_K_M` (~4.8 bpw) → ~42 GB
- at `Q3_K_M` (~3.9 bpw) → ~34 GB
- at `IQ2_XS` (~2.3 bpw) → ~20 GB

The bpw numbers above are slightly above the nominal bit count because GGUF stores per-block scales, embedding tensors, and metadata. A useful mental shortcut for GGUF: *a Q4 quant ≈ 60% of the model's parameter count in GB*.

## KV cache

For every token generated, the model writes `K` and `V` tensors for every layer and every head into a cache so it does not have to re-attend to past tokens. Per token:

- *KV bytes per token* = 2 × *layers* × *kv_heads* × *head_dim* × *bytes_per_element*

For Llama 3 70B: 80 layers × 8 KV heads (GQA) × 128 head_dim × 2 (K and V) × 2 bytes (`fp16`) ≈ **160 KB per token**.

So an 8 K context costs ~1.3 GB of KV cache. A 128 K context on the same model costs **~20 GB** — bigger than the model's *weights* at `IQ2_XS`. Long context is expensive, and the cost is on top of the model.

Tricks to control this:

- **Grouped-Query Attention (GQA)** is already baked into modern models — instead of one KV pair per query head, several query heads share one KV pair. Llama 3 70B has 64 query heads but only 8 KV heads, an 8× shrink.
- **KV cache quantization** (`Q8`, `Q4`) is supported by llama.cpp and vLLM. Halves or quarters the cache cost with minor quality impact.
- **Sliding-window attention** (Mistral, Gemma) caps the cache at `window_size` tokens.
- **Shorter context** is the simplest knob — most workflows do not actually need 128 K.

## Bandwidth, not flops

For single-user generation, transformer inference is **memory-bandwidth-bound**, not compute-bound. Each token requires reading every weight once. So:

- *generation tokens/sec* ≈ *memory_bandwidth* / *weight_bytes*

An RTX 4090 has ~1 TB/s of VRAM bandwidth. Running a Q4 70B model (~42 GB):

- 1000 GB/s ÷ 42 GB ≈ **24 tok/s** ceiling.

Real speeds are usually 60–80% of this ceiling. This is why a $5000 server CPU with 100 GB/s of DDR5 bandwidth runs a 70B model at ~1–2 tok/s while a Mac Studio with ~800 GB/s of unified memory runs the same model at ~10–15 tok/s. **Bandwidth wins.**

For batched serving, the calculus flips — once you have enough concurrent requests, the GPU becomes compute-bound and FLOPs start to matter. This is why vLLM gets so much more throughput than llama.cpp.

## Hardware tiers

Rough guide for what runs well at `Q4_K_M`-class quality:

- **8 GB VRAM** (RTX 3060 / 4060, M2 8 GB) — up to ~7B models. Useful for small assistants, autocomplete, embeddings.
- **16 GB VRAM / unified memory** (RTX 4060 Ti 16 GB, M2 Pro 16 GB) — up to ~13B models comfortably; 22B Codestral-class with short context.
- **24 GB** (RTX 3090 / 4090, M3 Pro 36 GB) — sweet spot. 32B models comfortably; 70B at `IQ3_*` if you accept the quality loss.
- **36–48 GB** (M3 Max 36/48, dual 3090, RTX 6000 Ada) — 70B at `Q4_K_M` with reasonable context. The first tier where frontier-class open weights are usable.
- **64–96 GB** (M3/M4 Max top-spec, A100 80 GB) — 70B at `Q5_K_M`/`Q6_K`, or 70B `Q4` with 32K+ context, or the smaller MoEs (Mixtral 8x7B).
- **128 GB+** (M4 Ultra 192, 2× A100, H100) — 70B in `bf16`, large MoEs (DeepSeek V3 at int4, Llama 4 Maverick), production serving.

Apple Silicon punches above its weight here because **all** of unified memory is available to the GPU, with respectable bandwidth. A $4000 M4 Max 128 GB is the most cost-effective way to run 70B-class models for a single user; it is *not* a substitute for an H100 for serving.

## Multi-GPU

When a model doesn't fit on one GPU, you split it.

- **Tensor parallelism** — slice each layer's matrices across N GPUs so they all do part of every forward pass. Best for latency. Needs fast interconnect (NVLink); over PCIe it bottlenecks fast.
- **Pipeline parallelism** — give each GPU a contiguous block of layers. Cheap interconnect is fine. Worse latency (only one GPU is active at a time without microbatching), better for throughput.
- **Layer offload** (CPU/GPU split, `--n-gpu-layers` in llama.cpp) — keep what fits in VRAM, run the rest on CPU. Works, but speed drops to CPU bandwidth for the offloaded layers.

For two consumer GPUs without NVLink, pipeline parallelism via llama.cpp or text-generation-webui is the practical path; vLLM's tensor parallel works but loses a lot to PCIe.

## Quick estimator

Given a model, a target quant, and a target context length, can it run on machine M?

- *weights GB* = *params (B)* × *bpw* / 8
- *KV GB* = *context* × *layers* × *kv_heads* × *head_dim* × 4 bytes / 1e9 *(2 for K+V × 2 bytes fp16)*
- *needed* = weights + KV + 2

If *needed* ≤ usable VRAM (call it 90% of total), it fits. Otherwise: drop the quant a tier, halve the context, or offload the spillover to CPU and accept a speed hit roughly proportional to the offloaded fraction.

## Resources

- [Transformer Math 101](https://blog.eleuther.ai/transformer-math/)
- [HuggingFace model memory calculator](https://huggingface.co/spaces/hf-accelerate/model-memory-usage)
- [llama.cpp memory layout discussion](https://github.com/ggerganov/llama.cpp/discussions/3471)

## Notes

*(none yet)*
