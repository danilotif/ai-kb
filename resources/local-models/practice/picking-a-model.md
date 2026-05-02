---
title: Picking a model
date_added: 2026-05-01
---

# Picking a model

A decision recipe to go from "I have machine X and task Y" to a specific model + quant. Companion to the *hardware sizing* and *open-weight landscape* theory pages.

## Step 1 — what's the task

*(chat / coding / reasoning / RAG / embeddings — different families dominate each)*

## Step 2 — what hardware do you have

*(VRAM/unified-memory bucket → max model size at Q4 — see hardware-sizing theory page)*

## Step 3 — narrow to a family

*(general → Qwen 3 / Llama 4 / Mistral; coding → Qwen Coder / DeepSeek-Coder; reasoning → DeepSeek-R1 / QwQ; small/edge → Phi / Gemma / Llama 3.2; multilingual → Qwen / Aya)*

## Step 4 — pick a size

*(default to the biggest that fits at Q4_K_M; bias up in size, down in quant, until ~Q3 floor)*

## Step 5 — pick a quant

*(GGUF Q5_K_M sweet spot if you have headroom; Q4_K_M default; Q3 only with importance-matrix calibration)*

## Step 6 — verify with your eval

*(don't trust model-card numbers; run 5–10 of your real prompts before committing)*

## Worked examples

*(M2 16 GB → Llama 3.2 8B Q5_K_M; RTX 4090 24 GB → Qwen 3 32B Q4_K_M; M4 Max 128 GB → Llama 3 70B Q5_K_M)*

## Common mistakes

*(running base instead of instruct; chasing the biggest model at Q2; ignoring license; forgetting context cost in VRAM)*

## Resources

- [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
- [LMSys Chatbot Arena](https://lmarena.ai)

## Notes

*(none yet)*
