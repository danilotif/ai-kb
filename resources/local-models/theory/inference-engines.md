---
title: Inference engines
date_added: 2026-05-01
---

# Inference engines

The "model" you download is just weights. An *inference engine* is the runtime that turns those weights plus a prompt into tokens. Choice of engine matters as much as choice of model — it determines which quantization formats you can use, which hardware works, how fast generation is, and whether you can serve more than one user at a time.

There are essentially three families:

- **Single-user runtimes** optimized for *latency* on one prompt at a time (llama.cpp, ExLlamaV2, MLX).
- **Serving runtimes** optimized for *throughput* under concurrent load (vLLM, TensorRT-LLM, SGLang).
- **Wrappers** that bundle a runtime with a friendly UX (Ollama, LM Studio, Jan, koboldcpp).

## llama.cpp

C/C++ implementation that started as a CPU-only port of LLaMA and is now the de-facto reference for local inference. Reads GGUF files. Backends for CUDA, Metal, ROCm, Vulkan, SYCL, plus pure CPU. Supports CPU/GPU split for models that don't fully fit in VRAM.

Strengths: works everywhere, broadest hardware coverage, smallest install footprint, exposes an OpenAI-compatible HTTP server (`llama-server`). Weakest at concurrent serving — batching exists but is not its specialty.

This is what you reach for first on Mac, on a laptop, or on any machine without a beefy Nvidia card.

## vLLM

Python serving framework built around **PagedAttention**, a KV-cache layout borrowed from OS virtual memory that eliminates fragmentation and lets you keep many in-flight requests sharing the same GPU. Adds **continuous batching**: new requests slot into the running batch token-by-token instead of waiting for a fixed-size batch to fill.

Strengths: order-of-magnitude higher throughput than naïve serving, OpenAI-compatible server, supports AWQ, GPTQ, FP8, and a growing list of quantizations. Nvidia first; ROCm and TPU support are improving.

This is what you reach for when more than one user/agent will hit the box, or when you need OpenAI-API-style serving locally.

## TensorRT-LLM

Nvidia's own inference library, built on TensorRT. Builds a model-specific compiled engine offline; that engine then runs faster than anything else on the same hardware (often 1.5–2× vLLM for the same model). Supports FP8 natively on H100/B200.

Costs: Nvidia-only, opinionated build pipeline, less flexible (engine is tied to a specific batch shape, sequence length, and quantization). Pick this when you have fixed Nvidia hardware and the engineering budget to compile and benchmark.

## ExLlamaV2

GPU-only library focused on fast single-user generation of GPTQ and EXL2 models on Nvidia. Tight CUDA kernels, low overhead, very strong tokens/sec for small batches. Used directly via `text-generation-webui` and `tabbyAPI`.

Pick when: one Nvidia GPU, one user at a time, you want the fastest possible generation and don't need vLLM's serving features.

## MLX

Apple's array framework with first-class LLM support (`mlx-lm`). Native Apple Silicon path — uses Metal directly, takes full advantage of the M-series unified memory model. Speed is similar to or slightly better than llama.cpp Metal on Mac, with a cleaner Python story for fine-tuning.

Pick when: Mac, Python workflow, you also want to LoRA-tune. For pure run-models-and-chat, llama.cpp/Ollama is still simpler.

## SGLang

Newer serving runtime built around a structured-generation DSL. Aggressive scheduling, **RadixAttention** for KV reuse across prompts that share prefixes. Faster than vLLM in workloads with prefix sharing (RAG, agents that reuse a system prompt). Less mature ecosystem.

## MLC LLM

Compiles models to portable runtimes via TVM. Targets unusual destinations: WebGPU in the browser, iOS, Android, Vulkan on consumer GPUs. Worse on the standard Nvidia path than vLLM or TensorRT-LLM, but the only realistic option for in-browser or on-device mobile.

## Wrappers

- **Ollama** — CLI + daemon + model registry on top of llama.cpp. Excellent UX (`ollama run llama3`). Default for most local users.
- **LM Studio** — desktop GUI on top of llama.cpp + MLX. Catalog browser, chat UI, OpenAI-compatible server. Good entry point on Mac/Windows.
- **Jan** — open-source desktop alternative to LM Studio.
- **koboldcpp** — llama.cpp fork popular in the roleplay/creative-writing community.
- **text-generation-webui** ("oobabooga") — multi-backend GUI that supports llama.cpp, ExLlamaV2, transformers.

Wrappers do not replace engines, they package them. When something feels slow or buggy, drop down to the underlying engine.

## How to choose

The decision usually collapses to two questions:

- *What hardware?* Mac → llama.cpp / MLX. Single Nvidia GPU → ExLlamaV2 (single-user) or vLLM (multi-user). Multiple Nvidia GPUs / production → vLLM or TensorRT-LLM. CPU only → llama.cpp.
- *One user or many?* One → latency-optimized engines. Many → serving-optimized engines.

Quantization format follows from engine choice: GGUF for llama.cpp; GPTQ/AWQ/FP8 for vLLM; EXL2 for ExLlamaV2; whatever MLX ships for MLX.

## Resources

- [llama.cpp](https://github.com/ggerganov/llama.cpp)
- [vLLM](https://docs.vllm.ai)
- [PagedAttention paper](https://arxiv.org/abs/2309.06180)
- [TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM)
- [ExLlamaV2](https://github.com/turboderp/exllamav2)
- [MLX](https://github.com/ml-explore/mlx)
- [SGLang](https://github.com/sgl-project/sglang)

## Notes

*(none yet)*
