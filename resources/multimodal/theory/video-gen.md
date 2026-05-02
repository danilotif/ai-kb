---
title: Video generation
date_added: 2026-05-02
---

# Video generation

The frontier where image generation was 18 months ago. Big lab models impressive on demos, expensive in compute, still wobbly on length and consistency.

## The basic idea

*(diffusion in space-time; condition on text and optionally a starting frame; predict noise over a 3D tensor)*

## Architectures

*(DiT (Diffusion Transformer) replaces U-Net; Sora-style joint space-time patches; latent video diffusion)*

## Conditioning

*(text-to-video, image-to-video, video-to-video, motion-controlled, camera-controlled)*

## The state of the art

*(closed: Sora, Veo, Runway Gen-3/4, Kling; open: Wan 2/2.5, Hunyuan-Video, Mochi, CogVideoX, LTX-Video)*

## What still breaks

*(temporal coherence past 5–10s, physical plausibility, character consistency across shots, fingers/hands, fast motion)*

## Inference cost

*(orders of magnitude more expensive than image gen; minutes per shot on a single GPU; specialized servers for production)*

## Editing & control

*(inpainting in time, motion brushes, ControlNet-equivalents for video; camera-path conditioning)*

## Audio

*(separately generated and aligned, or jointly modeled (Veo 3, Sora 2-style); audio coherence is harder than visual)*

## Resources

- [Sora technical report](https://openai.com/index/video-generation-models-as-world-simulators/)
- [Wan 2.5](https://huggingface.co/Wan-AI)

## Notes

*(none yet)*
