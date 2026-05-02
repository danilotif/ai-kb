---
title: LoRA & PEFT
date_added: 2026-04-02
---

# LoRA & PEFT

Parameter-efficient fine-tuning: train tiny add-on weights instead of the whole model. The default for almost all fine-tuning today.

## The basic idea

*(freeze base, learn a low-rank delta `B·A` injected into linear layers; only `r·(d_in + d_out)` parameters per layer)*

## Why it works

*(empirical: fine-tune updates have low intrinsic rank; the model already knows the task, you're just adjusting style/format)*

## QLoRA

*(LoRA over a 4-bit quantized base; fits 70B fine-tuning on a single 48 GB GPU)*

## Choosing rank and alpha

*(`r=8–64` typical; `alpha = 2r` rule of thumb; what each knob actually does)*

## Where to inject

*(attention projections only vs all linear layers; trade-offs)*

## Other PEFT methods

*(prefix tuning, prompt tuning, IA3, DoRA, ReLoRA; when each beats vanilla LoRA)*

## Merging adapters back

*(fusing into base for inference vs hot-swapping multiple adapters per request)*

## When LoRA isn't enough

*(big distribution shifts, new domains, very long-context behavior; full fine-tune territory)*

## Resources

- [LoRA paper](https://arxiv.org/abs/2106.09685)
- [QLoRA paper](https://arxiv.org/abs/2305.14314)
- [DoRA paper](https://arxiv.org/abs/2402.09353)

## Notes

*(none yet)*
