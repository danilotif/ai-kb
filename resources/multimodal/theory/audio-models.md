---
title: Audio models — TTS & ASR
date_added: 2026-05-02
---

# Audio models — TTS & ASR

Speech in, speech out. Two long-standing fields that LLMs are now eating from both ends.

## ASR — speech to text

*(Whisper as the open default; Distil-Whisper, faster-whisper for speed; streaming ASR for low latency)*

## TTS — text to speech

*(neural codec + AR transformer pattern (VALL-E, Tortoise, XTTS); diffusion-based TTS (StyleTTS); flow-matching TTS (F5-TTS))*

## Voice cloning

*(zero-shot reference voice, few-shot fine-tune; ethical and legal concerns)*

## Real-time speech-to-speech

*(GPT-4o-style: continuous audio in, continuous audio out, low latency; relies on audio codecs in the LLM token stream)*

## Audio codecs as tokenizers

*(EnCodec, SoundStream, DAC; quantize audio into discrete tokens an LLM can predict)*

## Music generation

*(MusicGen, Suno, Udio; conditioned on text prompts and reference audio)*

## Open vs closed gap

*(closed (ElevenLabs, OpenAI Voice) still ahead on naturalness; open is closing fast on neutral speech, lagging on expressive)*

## Resources

- [Whisper](https://github.com/openai/whisper)
- [F5-TTS](https://github.com/SWivid/F5-TTS)
- [EnCodec](https://github.com/facebookresearch/encodec)

## Notes

*(none yet)*
