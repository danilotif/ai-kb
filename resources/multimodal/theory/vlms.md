---
title: Vision-language models
date_added: 2026-05-02
---

# Vision-language models

Models that take images (or video frames) plus text and return text. The dominant multimodal pattern.

## Architectures

*(vision encoder (CLIP/SigLIP) → projector → LLM; or unified tokenization at the patch level)*

## Vision encoders

*(CLIP, SigLIP, EVA-02, native ViT in newer models; resolution and patch size matter)*

## Projector

*(linear, MLP, Q-Former, Perceiver-style cross-attention; how it maps vision tokens into LLM embedding space)*

## Native vs bolted-on

*(Llava-style training a projector on top of frozen LLM vs jointly trained from scratch; quality vs cost trade-off)*

## High-resolution & long-form

*(tile-based encoding for big images; sliding windows; document understanding tricks)*

## OCR-vs-perception

*(OCR-light models for charts/screenshots/code; perception-heavy for natural images; modern frontier models do both)*

## Open VLMs to know

*(Qwen-VL/Qwen2-VL, Llama 3.2 Vision, InternVL, MiniCPM-V, Phi-3.5-vision, PaliGemma)*

## Failure modes

*(spatial reasoning, counting, fine OCR, hallucinated objects, ignoring image when text is suggestive)*

## Resources

- [LLaVA](https://llava-vl.github.io)
- [Qwen2-VL paper](https://arxiv.org/abs/2409.12191)

## Notes

*(none yet)*
