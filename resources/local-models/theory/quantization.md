---
title: Quantization (GGUF, GPTQ, AWQ)
date_added: 2026-04-26
---

# Quantization (GGUF, GPTQ, AWQ)

Quantization compresses model weights from 16-bit floats down to 8, 4, 3, or even 2 bits per parameter. For local inference it is almost always the difference between a model that fits on your hardware and one that does not. A 70B model in `bf16` needs ~140 GB of VRAM; the same model at 4-bit fits in ~40 GB and runs on a single 48 GB card.

## Why it works

Most weights in a trained transformer are small, clustered around zero, and individually low-information. Replacing each weight with the nearest entry in a small *codebook* loses very little signal — until the codebook is too small or the few weights that *are* large get crushed. Modern quantization schemes are mostly elaborate strategies for *not* crushing the few weights that matter.

Two dimensions to keep separate:

- **Numerical format** — how a single number is stored (`fp16`, `bf16`, `int8`, `int4`, `nf4`, `fp8`).
- **Quantization scheme** — how a tensor is mapped onto that format (per-tensor, per-channel, per-group; static vs calibrated vs activation-aware).

A `Q4_K_M` GGUF file uses 4-bit ints, but the *scheme* is what makes it usable: weights are split into small blocks, each block has its own scale and zero-point, and the more-sensitive layers are kept at higher precision.

## The major formats

**GGUF** — the format used by `llama.cpp` and everything that wraps it (Ollama, LM Studio, Jan, koboldcpp). Successor to GGML. Self-contained single file with weights, tokenizer, and metadata. Supports CPU, CUDA, Metal, ROCm, Vulkan. The naming convention is `Q<bits>_<variant>`:

- `Q2_K`, `Q3_K_S/M/L`, `Q4_K_S/M`, `Q5_K_S/M`, `Q6_K`, `Q8_0` — *k-quants*, with per-block scales. The `_S/M/L` suffix controls how many layers get bumped to a higher precision.
- `IQ2_XXS`, `IQ3_XS`, `IQ4_NL`, ... — *importance-matrix quants*. Calibrated against a reference dataset so the quantizer knows which weights matter; meaningfully better than k-quants below 4 bits.
- `Q4_0`, `Q4_1`, `Q5_0` — older, simpler legacy quants. Avoid unless you have a reason.

**GPTQ** — post-training quantization for GPU inference. Uses a small calibration set to solve a layer-wise reconstruction problem (minimize output error, not weight error). Typically 4-bit. Format is consumed by ExLlamaV2, AutoGPTQ, vLLM. Excellent quality at 4-bit; less common above.

**AWQ** (Activation-aware Weight Quantization) — keeps the ~1% of weights with the largest activation magnitudes at higher precision and quantizes the rest aggressively. Calibration-based, like GPTQ, but cheaper and often slightly better at 4-bit. Supported by vLLM, TensorRT-LLM, AutoAWQ.

**EXL2** — the format ExLlamaV2 prefers. Mixed-precision: the quantizer assigns more bits to layers that need them, less to layers that don't, targeting a user-specified average *bits-per-weight* (e.g. 4.65 bpw). Best speed/quality on Nvidia for single-user generation.

**FP8** — true 8-bit floating point (`E4M3` / `E5M2`). Hardware-native on H100 and newer; very fast, near-lossless. Different beast from int8: the dynamic range comes from the float exponent, not from a learned scale.

**bitsandbytes (NF4, INT8)** — Hugging Face's on-the-fly path. NF4 (4-bit NormalFloat) is the format QLoRA uses for fine-tuning over a frozen quantized base. Convenient (`load_in_4bit=True`), but slower at inference than GPTQ/AWQ/EXL2.

## How much quality do you lose

Rough rules of thumb for a well-trained instruct model:

- **Q8_0 / fp8 / int8** — indistinguishable from `bf16` on most tasks.
- **Q6_K / 6 bpw** — within noise of `bf16`. The pragmatic ceiling.
- **Q5_K_M / 5 bpw** — small, real, but rarely user-visible quality drop. *Sweet spot* for most hardware budgets.
- **Q4_K_M / AWQ-4 / GPTQ-4** — measurable degradation, still very usable. The most popular tier because it doubles the model size you can run.
- **Q3_K_M / 3 bpw** — noticeable. Worth using only with importance-matrix calibration (`IQ3_*`) and only if you cannot fit the next tier up.
- **Q2_K / 2 bpw** — usually broken for chat. `IQ2_*` makes it merely *bad* instead of unusable. Last resort.

A useful heuristic: prefer a *bigger model at lower precision* over a *smaller model at higher precision*, until you hit `~Q3`. A 70B at `Q4_K_M` beats a 13B at `Q8_0` on almost everything.

## Measuring it

The two standard proxies:

- **Perplexity (PPL)** on a held-out corpus (e.g. wikitext). Easy to compute, weakly correlated with downstream quality. Use only to compare the *same* model at different quantizations.
- **KL divergence** from the unquantized model's logits. Stronger signal than PPL — directly measures how the distribution shifted.

Neither replaces task evals. If quantization choice matters for production, run your real eval suite at each tier.

## What to actually pick

- *Apple Silicon, single-user*: GGUF (`Q5_K_M` or `Q4_K_M`) via llama.cpp/Ollama.
- *Single Nvidia GPU, single-user, max speed*: EXL2 at the highest bpw that fits.
- *Single Nvidia GPU, batched serving*: AWQ or GPTQ via vLLM. FP8 if on H100/B200.
- *CPU-only*: GGUF with `Q4_K_M` or smaller; expect bandwidth to dominate.

## Resources

- [llama.cpp k-quants discussion](https://github.com/ggerganov/llama.cpp/pull/1684)
- [GPTQ paper](https://arxiv.org/abs/2210.17323)
- [AWQ paper](https://arxiv.org/abs/2306.00978)
- [QLoRA paper (NF4)](https://arxiv.org/abs/2305.14314)

## Notes

*(none yet)*
