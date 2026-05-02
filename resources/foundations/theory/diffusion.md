---
title: Diffusion models
date_added: 2026-04-25
---

# Diffusion models

The dominant generative family for everything that isn't text. The math is cleaner than the autoregressive equivalent, the training objective is more forgiving, and the architecture decouples nicely from sampling — which is why a 2020 paper still reads as the canonical reference six years later.

This page assumes you've seen score-based methods or denoising autoencoders. The goal is the *modern* diffusion stack (latent space, classifier-free guidance, fast samplers, DiT) and why each piece is there.

## The forward process

Define a Markov chain that gradually corrupts data with Gaussian noise:

$$q(x_t \mid x_{t-1}) = \mathcal{N}\!\left(x_t;\; \sqrt{1 - \beta_t}\, x_{t-1},\; \beta_t I\right)$$

After $T$ steps with a small enough variance schedule $\beta_t$, $x_T$ is indistinguishable from isotropic Gaussian noise. A useful shortcut: the marginal $q(x_t \mid x_0)$ is closed-form Gaussian with mean $\sqrt{\bar{\alpha}_t}\, x_0$ and variance $(1 - \bar{\alpha}_t) I$ where $\bar{\alpha}_t = \prod_{s=1}^{t} (1 - \beta_s)$. So you can jump directly to any noise level without simulating the chain — critical for training.

## The reverse process

Learn $p_\theta(x_{t-1} \mid x_t)$. Because the forward step is small-Gaussian, the reverse is approximately Gaussian too; parameterize its mean and (often fixed) variance with a neural network. The training objective (DDPM, 2020) collapses to:

$$L = \mathbb{E}_{t,\, x_0,\, \epsilon}\!\left[\, \left\| \epsilon - \epsilon_\theta(x_t, t) \right\|^2\, \right]$$

i.e., a network that predicts the noise added at level $t$, with $t$ and $x_0$ sampled uniformly. Two things this objective gets right:

- **No likelihood manipulation.** No invertibility constraint, no autoregressive ordering, no adversarial training. Plain regression.
- **Implicit curriculum.** Early $t$ (heavy noise) teaches global structure; late $t$ (light noise) teaches fine detail. The network averages over all of it.

The variational ELBO derivation shows this loss is a weighted version of $\mathrm{KL}(q \,\|\, p_\theta)$ plus a reconstruction term; in practice the unweighted MSE form (the "simple loss") works better.

## Score-based view

Equivalent formulation: instead of predicting the noise, learn $s_\theta(x_t, t) \approx \nabla_x \log p_t(x)$. The two parameterizations differ by a sign and a known scale factor — $s_\theta = -\epsilon_\theta / \sqrt{1 - \bar{\alpha}_t}$. The score view is what lets you reformulate sampling as solving a stochastic differential equation:

$$dx = \left[\, f(x, t) - g(t)^2 \nabla_x \log p_t(x)\, \right] dt + g(t)\, d\bar{w}$$

This unlocks two practical wins:

- **Deterministic sampling** (probability-flow ODE) — drop the Brownian term and integrate the deterministic ODE. Same marginals as the SDE, far fewer steps.
- **Sampler-as-numerical-solver.** DDIM, Euler, Heun, DPM++, UniPC are just different integration schemes. Quality vs steps is now a numerics question.

## Classifier-free guidance

Conditioning on text $c$ (or anything else) is straightforward — feed $c$ into the network alongside $x_t$ and $t$, typically via cross-attention. The trick that made text-to-image work is:

$$\tilde{\epsilon}_\theta(x_t, c) = \epsilon_\theta(x_t, \emptyset) + s \cdot \left[\, \epsilon_\theta(x_t, c) - \epsilon_\theta(x_t, \emptyset)\, \right]$$

Train the network with conditioning dropout (replace $c$ with a null token 10–20% of the time), then at sampling time extrapolate beyond the conditional prediction by factor $s$. $s = 1$ is plain conditional sampling; $s = 7\text{–}10$ is typical for image generation. This is the single biggest reason early text-to-image went from "looks vaguely like a cat" to "indistinguishable from a stock photo".

The cost is two forward passes per step (conditional + unconditional). Distilled-guidance models fold this into one pass.

## Latent diffusion

Diffusing in pixel space at $1024^2$ is wasteful — most of the bits are texture detail that a VAE can compress losslessly to perception. The Latent Diffusion (Stable Diffusion) recipe:

1. Train a VAE that compresses $512 \times 512 \times 3$ to $64 \times 64 \times 4$ ($8\times$ spatial, $\sim\!48\times$ total).
2. Run diffusion entirely in that latent space.
3. Decode to pixels at the end.

$\sim\!50\times$ cheaper at training and sampling, with no perceptible quality cost. Every modern image diffusion model is latent. The same trick generalizes: video latents are 3D, audio latents are 1D mel-spectrogram-like.

## Architectures

The original DDPM used a U-Net (convolutional, hierarchical, with skip connections). It was the right choice for 2020 — small models, image-shaped data, locality matters.

The shift since 2023 is to **DiT** (Diffusion Transformer): treat the latent as a sequence of patches, run a plain transformer with adaLN conditioning. Trade-offs:

- **Scales with parameters cleaner than U-Net** — same scaling-laws story as for LLMs.
- **Loses inductive biases** (locality, translation equivariance) — needs more data and compute to match a U-Net at small scale; pulls ahead at scale.
- **Mixes modalities easily** — sequence is sequence; text and image patches concatenate naturally. SD3, Sora, Flux, and most 2025+ models are DiT-derived.

## Samplers

The integration scheme determines how many forward passes you need:

- **DDPM (ancestral)** — ~1000 steps. The baseline. Almost no one uses it.
- **DDIM** — ~50 steps. Deterministic, fast, the 2021 default.
- **Euler / Heun** — ~30 steps. Standard ODE solvers.
- **DPM++ 2M Karras** — ~20 steps. Multi-step; current quality leader for general use.
- **UniPC** — 10–15 steps. Higher-order; great when steps are expensive.
- **Consistency / LCM / Turbo / Lightning** — 1–4 steps. Distilled. Quality drop is real but acceptable for many uses.

Distillation (consistency models, LCM, SDXL Turbo, SD3.5 Flash) collapses many denoising steps into one or four, at a quality cost that's been shrinking. For interactive use this is what makes "draw on a canvas, image updates as you draw" feasible.

## Beyond images

- **Video** — diffusion in space-time. The DiT lets you treat (frame, height, width) patches as one sequence with full attention; expensive but enables true temporal consistency. Sora, Veo, Wan all here.
- **Audio** — diffuse mel-spectrograms or raw waveforms; usually pair with a HiFi-GAN-class vocoder. Less dominant than text-AR + audio-codec for speech but strong for music (Suno, Udio).
- **3D** — score distillation (DreamFusion) pulls a 2D diffusion model's gradients onto a NeRF or Gaussian splat. The output is a 3D scene supervised entirely through 2D renders.
- **Proteins / molecules** — RFdiffusion, AlphaFold 3 use diffusion over residue coordinates. The architecture moves to SE(3)-equivariant networks.

## Diffusion vs autoregression

For continuous, high-bandwidth data (images, audio, video), diffusion wins because:

- The output is dense, not a token sequence — there's no canonical raster order to AR over.
- Errors in early steps don't catastrophically compound the way they do in long AR generations.
- Test-time compute is a smooth knob (number of denoising steps), not a discrete one.

For text, autoregression wins because:

- Text *is* discrete and *has* a canonical left-to-right order.
- The KV cache makes AR generation surprisingly cheap (memory-bandwidth, not compute, bound).
- Diffusion-on-tokens (LLaDA, score-entropy text diffusion) exists and is interesting but trails AR LLMs on quality at any given compute budget.

The split has held for years. Don't expect it to flip.

## Resources

- [DDPM paper](https://arxiv.org/abs/2006.11239) — the canonical reference.
- [Score-based generative modeling through SDEs](https://arxiv.org/abs/2011.13456) — Song et al., the unified SDE view.
- [Latent Diffusion](https://arxiv.org/abs/2112.10752) — the Stable Diffusion paper.
- [Classifier-Free Guidance](https://arxiv.org/abs/2207.12598)
- [DiT paper](https://arxiv.org/abs/2212.09748)
- [Lilian Weng — Diffusion Models](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) — the best survey, updated regularly.
- [Sander Dieleman blog](https://sander.ai) — deep posts on guidance, samplers, geometry.

## Notes

_(none yet)_
