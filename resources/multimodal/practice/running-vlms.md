---
title: Running VLMs locally
date_added: 2026-05-02
---

# Running VLMs locally

Practical guide to running an open vision-language model on your hardware.

## Pick a model

*(Qwen2-VL 7B / 72B for general; MiniCPM-V for compactness; InternVL for accuracy; Llama 3.2 11B Vision; Phi-3.5-vision for tiny rigs)*

## VRAM math for VLMs

*(LLM weights + vision encoder weights + image tokens in KV cache; high-res images can cost thousands of tokens per image)*

## Engines that support vision

*(llama.cpp now supports several VLMs; vLLM has growing VLM support; transformers as the universal fallback)*

## GGUF quantizations

*(check that the GGUF includes both the LLM and the vision projector / encoder; some re-quants split them)*

## Image preprocessing

*(per-model resolution requirements; tile-based for high-res; aspect-ratio handling)*

## Common workflows

*(screenshot → describe; PDF page → extract; chart → table; UI screenshot → action plan)*

## Performance tips

*(downsize images before sending; cache vision-encoder output if you'll reuse the same image)*

## When to fall back to closed APIs

*(complex documents, multi-image reasoning, fine OCR; closed models are still meaningfully ahead here)*

## Resources

- [Qwen2-VL on HF](https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct)
- [llama.cpp vision support](https://github.com/ggerganov/llama.cpp/tree/master/examples/llava)

## Notes

*(none yet)*
