---
title: Diffusion models
date_added: 2026-04-25
---

# Diffusion models

Generative models that learn to undo noise. The dominant family for image, video, and increasingly audio.

## The forward process

*(progressively add Gaussian noise to data over T steps until pure noise)*

## The reverse process

*(learn to predict the noise added at each step; subtract it; iterate from noise back to data)*

## Score-based view

*(equivalent formulation: learn ∇log p(x); SDE/ODE perspective; deterministic samplers)*

## Conditioning

*(text → image via cross-attention; classifier-free guidance scaling the conditional vs unconditional prediction)*

## Architectures

*(U-Net (Stable Diffusion 1/2/XL), DiT (Stable Diffusion 3, Sora-class), MM-DiT)*

## Latent diffusion

*(diffuse in VAE latent space, not pixel space; 8× cheaper, comparable quality)*

## Samplers

*(DDPM, DDIM, Euler, DPM++, UniPC; the speed–quality trade-off)*

## Beyond images

*(video diffusion adds time, audio diffusion in mel space, 3D diffusion in NeRF/Gaussian-splat space)*

## Diffusion vs autoregression

*(non-causal, parallel denoising vs token-by-token; why image generation went diffusion, why language stayed AR)*

## Resources

- [DDPM paper](https://arxiv.org/abs/2006.11239)
- [Latent Diffusion paper](https://arxiv.org/abs/2112.10752)
- [Lilian Weng — diffusion models](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)

## Notes

*(none yet)*
