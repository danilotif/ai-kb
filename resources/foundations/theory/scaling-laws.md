---
title: Scaling laws
date_added: 2026-05-02
---

# Scaling laws

The empirical relationships between compute, parameters, and data that turn frontier-model training from a fishing expedition into a forecasting problem. The reason training runs are budgeted in hundreds of millions of dollars before anyone sees the loss curve.

This page assumes you've seen power laws and basic statistical-mechanics scaling arguments. The interesting parts are the specific exponents, where the laws have shifted, and where they break entirely.

## Kaplan (2020)

The original OpenAI paper measured language-model loss $L$ as a function of three independent variables — non-embedding parameters $N$, dataset size $D$ (in tokens), and training compute $C$ — and found clean power laws over more than four orders of magnitude in $C$:

$$L(N) \propto N^{-\alpha_N}, \quad L(D) \propto D^{-\alpha_D}, \quad L(C) \propto C^{-\alpha_C}$$

with $\alpha_N \approx 0.076$, $\alpha_D \approx 0.095$, $\alpha_C \approx 0.05$. The headline takeaway, given a fixed compute budget, was that you should *bias hard toward parameters and undertrain on data*. Roughly, optimal $D \propto N^{0.74}$ — a $10\times$ bigger model wanted only $\sim\!5\times$ more data.

This was the empirical foundation for the "just make it bigger" era — GPT-3 175B trained on $\sim\!300$B tokens, Gopher 280B on $\sim\!300$B tokens, MT-NLG 530B on $\sim\!270$B tokens. All deeply undertrained by what came next.

## Chinchilla (2022)

DeepMind's paper, by Hoffmann et al., revisited the same exercise with a tighter experimental setup and arrived at a strikingly different conclusion. Loss as a joint function fits:

$$L(N, D) = E + \frac{A}{N^{\alpha}} + \frac{B}{D^{\beta}}$$

with $\alpha \approx 0.34$, $\beta \approx 0.28$. Crucially, when you minimize this under a compute constraint the optimal scaling is *symmetric*:

$$\frac{D_{\mathrm{opt}}}{N_{\mathrm{opt}}} \approx 20$$

i.e., a compute-optimal model trains for about 20 tokens per parameter. They demonstrated by training Chinchilla — 70B parameters on 1.4T tokens — and beat Gopher's 280B/300T. Same compute, $4\times$ smaller model, more data, better loss across nearly every benchmark.

Why the discrepancy with Kaplan? Chinchilla used a properly tuned learning-rate schedule for each model size; Kaplan held it roughly fixed. With the schedule fix, the curvature of the $L(N, D)$ surface changes meaningfully.

## The compute identity

For a transformer the per-step FLOP count is approximately

$$C \approx 6\, N\, D$$

where the 6 comes from forward pass ($\sim\!2N$ FLOPs per token) plus backward pass ($\sim\!4N$), and $D$ is the total tokens seen. This identity is the rosetta stone — given any two of $N$, $D$, $C$, you can solve for the third:

- A 70B model trained on 1T tokens: $C \approx 4.2 \times 10^{23}$ FLOPs.
- 6000 H100s at 1 PFLOP/s of useful FP16 throughput each (so $\sim\!50\%$ of peak), running for 30 days: $\approx 4.7 \times 10^{23}$ FLOPs.

So "70B on 1T tokens" is "a few thousand H100s for a month", and you can ballpark anything else from there.

The Chinchilla rule then becomes: at compute budget $C$, train $N^{*} \approx \sqrt{C / 120}$ parameters on $D^{*} \approx 20\, N^{*}$ tokens.

## Inference-optimal training

Chinchilla optimizes *training* loss per dollar. If your model will serve a billion tokens after training, you also pay inference cost — and a smaller model serves cheaper.

Concretely, if amortized inference dominates, the right thing to do is train *past* Chinchilla-optimal: smaller $N$, larger $D$ than the symmetric ratio suggests. Llama 3 8B is the canonical example — 8B parameters trained on $\sim\!15$T tokens, $\sim\!1875$ tokens per parameter, nearly $100\times$ past Chinchilla. The training was hugely compute-inefficient, the resulting model is dramatically inference-cheaper than a Chinchilla-optimal 70B with comparable quality on most tasks.

Gemma, Phi, Qwen 3 small models all sit in this regime. The implicit calculation is: how many tokens of inference will this model serve, and at what dollar/token. For a frontier closed model serving billions of tokens daily, inference-optimal beats training-optimal by a wide margin.

## Where the laws break

The Chinchilla form $L = E + A\, N^{-\alpha} + B\, D^{-\beta}$ is empirical, not derived. Several places it stops being predictive:

- **At small data.** The $D^{-\beta}$ term assumes "high-quality, well-deduplicated tokens". Real corpora aren't that. Phi-class models show that data *quality* can outweigh data *quantity* by an order of magnitude at small scale.
- **At small $N$.** Below a few hundred million parameters, model architecture (depth/width ratios, MoE vs dense) starts to matter more than raw scale.
- **For specialized capabilities.** Math, code, multilingual: the law in aggregate loss says nothing about which capability emerges where. "Emergent" benchmarks (GSM8K, BIG-Bench Hard) show sharp non-power-law transitions in pass-rate as $N$ crosses a threshold, even while loss decreases smoothly.
- **For RL post-training.** RLVR, RLHF, DPO are post-pretraining stages; their improvements don't sit on the pretraining scaling curve at all. DeepSeek-R1's reasoning capability comes mostly from RL on top of a not-particularly-frontier base.

The takeaway is not that scaling laws are wrong — they remain extremely good at predicting *pretraining loss* — it's that pretraining loss is not the only thing that matters anymore.

## Test-time compute as a separate axis

A new scaling axis was opened by o-series and DeepSeek-R1: spend more compute *at inference* and get reliably better answers. Empirically, on hard benchmarks (AIME, MATH, ARC-AGI), accuracy rises near-log-linearly with the number of thinking tokens generated, often with a steeper slope than the equivalent training compute would buy.

The tradeoff:

- **Training compute** is amortized — pay once, use forever.
- **Test-time compute** is per-query — pay every call.

For very hard, high-value queries (research, software, planning) test-time compute wins by a margin — generating 50K thinking tokens for a $0.50 query is fine. For high-volume cheap queries it doesn't pay.

The frontier labs are explicitly redistributing budget across these two axes. Closed reasoning APIs charge $\sim\!5\text{–}10\times$ for thinking-enabled tiers; the unit economics make sense because the user gets dramatically better answers on hard tasks.

## What this implies for the next few years

- **The data wall is real.** High-quality web text is finite. Frontier pretraining is exhausting it. Synthetic data, multilingual expansion, multimodal data, code, math, and "self-play"-generated reasoning traces are the responses.
- **MoE pulls the cost curve.** Active-vs-total parameters break the simple $C = 6ND$ identity. DeepSeek V3 trains with active parameters but stores total parameters. Cost scaling is now two-dimensional.
- **Post-training matters more than pretraining for many capabilities.** Reasoning, instruction-following, tool use, agentic competence — all post-training stages. The "frontier" shifts from pretraining FLOPs toward post-training engineering.
- **Inference compute is a serious budget item.** Reasoning models can spend more inference compute per query than the training cost per query was a year ago.

The pretraining scaling laws still hold. The interesting questions about capability progress have moved off the curve.

## Resources

- [Kaplan et al. — Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361) — the original OpenAI paper.
- [Hoffmann et al. — Training Compute-Optimal Large Language Models (Chinchilla)](https://arxiv.org/abs/2203.15556)
- [Hestness et al. — Deep Learning Scaling is Predictable, Empirically](https://arxiv.org/abs/1712.00409) — the 2017 prequel.
- [Lilian Weng — Scaling Laws](https://lilianweng.github.io/posts/2025-01-12-rl-reward-hacking/) — periodic updates including post-Chinchilla developments.
- [Scaling test-time compute (DeepMind, 2024)](https://arxiv.org/abs/2408.03314) — the inference-axis paper.
- [Dario Amodei — Machines of Loving Grace](https://darioamodei.com/machines-of-loving-grace) — frontier-lab perspective on what scaling continues to imply.

## Notes

_(none yet)_
