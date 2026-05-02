---
title: llama.cpp directly
date_added: 2026-05-01
---

# llama.cpp directly

When you want full control without the Ollama/LM Studio wrapper. Build, run, and serve GGUF models from the command line.

## Building

*(clone, `make` flags for CUDA / Metal / Vulkan / ROCm, prebuilt releases)*

## Getting a model

*(downloading GGUFs from HuggingFace, common re-quantizers like bartowski/mradermacher, picking a quant tier)*

## llama-cli — interactive

*(`llama-cli -m model.gguf -p ...`, chat templates, sampling flags, `-ngl` for GPU layers)*

## llama-server — OpenAI-compatible API

*(`llama-server -m model.gguf --port 8080`, endpoints, parallel slots, multi-user)*

## Running multiple models / hot-swap

*(per-model server processes, `--no-mmap`, model caching trade-offs)*

## Quantizing your own

*(`convert_hf_to_gguf.py`, `llama-quantize` to k-quants, importance-matrix workflow)*

## Performance knobs

*(`-ngl`, `-c` context, `-b` batch, `--flash-attn`, KV cache quant flags)*

## Resources

- [llama.cpp](https://github.com/ggerganov/llama.cpp)
- [llama.cpp server docs](https://github.com/ggerganov/llama.cpp/tree/master/examples/server)

## Notes

*(none yet)*
