---
title: LoRA fine-tune recipe
date_added: 2026-05-02
---

# LoRA fine-tune recipe

End-to-end: take a base model, a small dataset, end with a fine-tuned adapter you can serve.

## Pick a base model

*(matching license, instruct vs base, size that fits with QLoRA; chat template you can stick to)*

## Prepare the dataset

*(jsonl with `messages` or `text`; consistent chat template; train/eval split; 100s–10000s of examples is the LoRA sweet spot)*

## Pick the framework

*(Hugging Face TRL, Axolotl, Unsloth, MLX-LM; each opinionated about config; Unsloth is fastest single-GPU)*

## Config the run

*(`r`, `alpha`, target modules, learning rate ~1e-4 to 3e-4, epochs 1–3, batch with grad accumulation)*

## Quantized base

*(QLoRA: load base in 4-bit nf4 with bitsandbytes; cuts VRAM ~4×; tiny quality cost)*

## Monitor

*(train loss, eval loss, periodic generation samples; stop when eval plateaus or starts climbing)*

## Save & merge

*(save adapter only — small file; optionally fuse into base for single-file deployment)*

## Serve

*(vLLM with `--enable-lora`; multiple adapters on one base; or fused base via any engine)*

## Resources

- [TRL](https://huggingface.co/docs/trl)
- [Axolotl](https://github.com/axolotl-ai-cloud/axolotl)
- [Unsloth](https://github.com/unslothai/unsloth)

## Notes

*(none yet)*
