---
title: Open-weight landscape
date_added: 2026-05-01
---

# Open-weight landscape

"Open" is a slippery word in this space. A useful distinction:

- **Open-source** — weights, training code, training data, eval setup all published under a permissive license. Rare. Examples: OLMo, Pythia, the original BLOOM.
- **Open-weight** — weights are downloadable and runnable, with a license that permits at least non-commercial or limited commercial use. Training data and recipe are usually closed. The vast majority of models you'll actually use locally.
- **Available-weight** — weights leaked or released under conditions so restrictive they are effectively read-only (research preview, evaluation only). Treat as a technical curiosity unless the license is what you want.

For practical local use, open-weight is what matters. The interesting variation is in *who released them*, *what license*, *what size*, and *what the model is good at*.

## The major families

**Llama (Meta)** — the most influential family in the open-weight space. Llama 1 leaked in early 2023; Llama 2 was the first frontier-adjacent model under a permissive (if custom) license; Llama 3 in 2024 closed most of the gap to closed models; Llama 4 in 2025 introduced Meta's MoE line. Sizes from 1B (Llama 3.2) to 405B. License is the *Llama Community License* — Apache-like, but with carve-outs (services with >700M MAU need a separate agreement, no using outputs to train other models).

**Qwen (Alibaba)** — most aggressive shipping cadence in the open-weight world. Qwen 2.5 (2024) and Qwen 3 (2025) are excellent across coding, math, and multilingual. Sizes 0.5B to 72B dense, plus 30B-A3B and 235B-A22B MoEs. Most are Apache 2.0; a few of the biggest are released under a custom license. The Coder and Math sub-lines are state of the art for open weights.

**Mistral** — smaller, denser, very efficient models. Mistral 7B in 2023 set the bar for what a 7B should feel like. Mixtral 8x7B and 8x22B introduced the MoE pattern at this scale. Recent releases (Mistral Small/Medium/Large) split between Apache 2.0 (smaller, older) and a more restrictive *Mistral Research License* (larger, newer).

**DeepSeek** — Chinese lab that pushed the open MoE frontier. DeepSeek V3 (671B total, ~37B active per token) and the DeepSeek-R1 reasoning line are competitive with frontier closed models on coding and math. MIT license on the weights. Caveat: the full models need ~400 GB of VRAM at int4; the *distilled* variants (DeepSeek-R1-Distill on top of Qwen and Llama bases) are what most people actually run.

**Gemma (Google DeepMind)** — Google's small-and-mid open releases. Gemma 1, 2, 3 all in the 2B–27B range. Strong reasoning per parameter, distilled from Gemini. Custom *Gemma Terms of Use* — permits commercial use but with a usage policy you must comply with downstream.

**Phi (Microsoft)** — small models trained on heavily curated, "textbook-quality" synthetic data. Phi-3 (3.8B/7B/14B), Phi-4 (14B). Punch far above their weight class on reasoning benchmarks; weaker on broad world knowledge. MIT license.

**OLMo / OLMoE (AI2)** — fully open: weights, training data, intermediate checkpoints, eval code. The reference for *actually* open. Sizes 1B, 7B, 13B; OLMoE is a sparse MoE variant. Apache 2.0. Capability-wise behind frontier open weights — you pick this when you want to *study* training, not when you want the strongest model.

**Yi (01.AI)**, **GLM (Zhipu)**, **Command-R (Cohere)**, **Falcon (TII)**, **StableLM (Stability)**, **MPT (MosaicML)** — second-tier or older families. Generally surpassed by the leaders above, but sometimes competitive on specific axes (Command-R for RAG, GLM for Chinese).

## Specialized variants

For most major families, expect to see:

- **Base** — pretrained only. Useful for fine-tuning or for completion-style tasks. Don't chat with it directly; it doesn't follow instructions.
- **Instruct / Chat** — RLHF/DPO post-trained. The default for assistant use.
- **Coder** — fine-tuned on code (Qwen2.5-Coder, DeepSeek-Coder, CodeLlama, StarCoder). The Qwen 2.5 / 3 Coder line is the current open SOTA.
- **Math** — fine-tuned on math (Qwen2.5-Math, DeepSeek-Math).
- **Reasoning** — trained with reinforcement learning to produce long chain-of-thought traces (DeepSeek-R1, QwQ, the reasoning variants of Qwen 3). Slower per query, much stronger on hard problems.

## Dense vs MoE

A **dense** model uses every parameter for every token. A 70B dense model = 70B doing work each token.

A **mixture-of-experts (MoE)** model has many "experts" but only routes each token through a small subset. DeepSeek V3 is 671B *total* but only ~37B *active* per token. Mixtral 8x7B is ~47B total, ~13B active.

Practical implications:

- MoE is faster per token at the same *active* size, but requires VRAM proportional to *total* size — all experts must be in memory because routing is dynamic.
- MoE is good when you have a lot of memory and want speed. Bad when memory is the constraint.
- Quantization helps MoE more in absolute terms (lots more weights to compress).

## Licenses, in plain terms

- **Apache 2.0 / MIT** — do anything, including commercial use and redistribution. The cleanest case.
- **Llama Community / Gemma Terms / Qwen License** — permit commercial use, with restrictions: usage policies, attribution, sometimes scale caps, sometimes prohibitions on training competing models. Read before shipping a product.
- **Research-only / non-commercial** (Mistral Research License at the high end, some Yi/GLM variants) — fine for prototypes and personal use, blocking for SaaS.
- **Custom evaluation licenses** — model is downloadable but not redistributable, often with a 30-day or fixed-batch limit. Treat as a closed model with a generous trial.

A model's license can change between releases in the same family. Always check the model card on the actual release you're downloading.

## Where to find them

- **Hugging Face** is the de facto registry. Each family ships official repos under the org name (`meta-llama/`, `Qwen/`, `mistralai/`, `deepseek-ai/`, `google/`).
- **Quantization re-hosts** — most users don't run the official `bf16` weights. Re-quantizers like `bartowski`, `mradermacher`, `LoneStriker` publish GGUF/AWQ/EXL2 versions soon after release.
- **Ollama Library** mirrors the most popular models in GGUF form, fronted by friendly tags (`ollama run qwen2.5:14b`).

## Reading a model card

Three things to look for before downloading:

- **Architecture and tokenizer** — confirms compatibility with your runtime. A new tokenizer often means waiting for `llama.cpp` PRs.
- **Training data cutoff** — anything after this date is unknown to the model.
- **Eval table** — how it compares to peers on MMLU, MMLU-Pro, GSM8K, HumanEval, and any domain benchmark you care about. Treat with skepticism: numbers on official cards are usually best-case.

## Resources

- [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
- [LMSys Chatbot Arena](https://lmarena.ai)
- [AI2 OLMo](https://allenai.org/olmo)
- [Llama Community License](https://llama.meta.com/llama3/license/)

## Notes

*(none yet)*
