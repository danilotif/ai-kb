---
title: Full fine-tuning vs PEFT
date_added: 2026-05-02
---

# Full fine-tuning vs PEFT

When LoRA is enough, when you need to update every weight, and what it costs.

## What changes with full fine-tune

*(every parameter trainable; needs gradients + optimizer state for the whole model; ~3–4× the model's bf16 footprint in VRAM)*

## When LoRA falls short

*(big domain shifts, new language, new task family, very long-context regression, instruction style overhaul)*

## Hybrid approaches

*(continued pretraining, then SFT, then DPO; layer-wise freezing; selective full-finetune of only later layers)*

## Compute cost comparison

*(LoRA on 70B at QLoRA-4: 1× 48 GB GPU; full FT on 70B bf16: 8× H100 territory)*

## Catastrophic forgetting

*(easy to break general capability while teaching one task; mitigations: replay buffer, lower learning rate, KL anchor)*

## When to just use a smaller base

*(fine-tuning a 7B from scratch beats LoRA-on-70B for narrow tasks at lower deploy cost)*

## Resources

- [HF — Train with PEFT vs full FT](https://huggingface.co/docs/peft/conceptual_guides/lora)

## Notes

*(none yet)*
