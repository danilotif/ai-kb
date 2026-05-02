---
title: Multimodal — overview
date_added: 2026-05-01
---

# Multimodal

Models that take in or emit modalities other than text. Image, audio, video — sometimes inside the same model, sometimes a stack.

## What "multimodal" means in 2026

*(natively unified vs adapter-bridged; understanding (input) vs generation (output); any-to-any models)*

## Common model shapes

*(VLMs — image-in, text-out; TTS — text-in, audio-out; ASR — audio-in, text-out; image-gen, video-gen, music-gen)*

## How modalities get into a transformer

*(tokenization-equivalents per modality: vision encoders, audio codecs, video tokenizers; project into LLM's embedding space)*

## How modalities get out

*(diffusion heads for continuous output; discrete tokenizers + AR for audio (SoundStream, EnCodec))*

## Frontier models

*(GPT-4o/5o omnimodel, Gemini 2/3 multimodal, Claude with vision, open: Qwen-VL, Llama 4, MiniCPM-o)*

## What still doesn't work well

*(precise spatial reasoning, video coherence past minutes, real-time bidirectional audio, fine-grained editing of generated media)*

## Resources

- [GPT-4o announcement](https://openai.com/index/hello-gpt-4o/)
- [Qwen-VL paper](https://arxiv.org/abs/2308.12966)

## Notes

*(stub — replace with study content)*
