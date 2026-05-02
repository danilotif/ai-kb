---
title: MLX on Apple Silicon
date_added: 2026-05-01
---

# MLX on Apple Silicon

Apple's native path. Worth it on Mac when you want a Python workflow, plan to fine-tune, or want the cleanest unified-memory story.

## Install

*(`pip install mlx-lm`, Python version, requirements)*

## Running a model

*(`mlx_lm.generate`, `mlx_lm.chat`, choosing a converted model from the `mlx-community` HF org)*

## Converting & quantizing

*(`mlx_lm.convert` from HF safetensors, 4-bit / 8-bit options, group size)*

## Server mode

*(`mlx_lm.server` OpenAI-compatible endpoint)*

## LoRA / QLoRA fine-tuning

*(`mlx_lm.lora`, dataset format, fusing adapters back into base)*

## llama.cpp Metal vs MLX

*(when each is faster, what each path lacks)*

## Resources

- [mlx-lm](https://github.com/ml-explore/mlx-lm)
- [mlx-community on HF](https://huggingface.co/mlx-community)

## Notes

*(none yet)*
