---
title: Jailbreaks & defenses
date_added: 2026-05-02
---

# Jailbreaks & defenses

What attackers do to subvert system prompts and policies, and what builders can do about it. Defensive perspective.

## Categories of attack

*(prompt injection (indirect, via retrieved content), instruction override, role-play / DAN, encoding tricks, multi-turn drift, payload smuggling via tool output)*

## Indirect prompt injection

*(malicious content arriving via web pages, files, emails, MCP responses; the agent reads it and is told to do something against its principal)*

## Multi-turn jailbreaks

*(many-shot jailbreaking, gradual escalation, context-window saturation; why single-turn defenses miss them)*

## Defenses — input layer

*(content classifiers, prompt-level rules, source labeling (data: vs instructions: framing))*

## Defenses — model layer

*(safety-tuned base, constitutional AI, dual-use RLHF; brittleness to OOD attacks)*

## Defenses — output layer

*(output classifier, structured-output schema enforcement, tool-call allowlists, blast-radius limits)*

## Defense in depth

*(no single layer holds; combine prompt + classifier + output filter + permissioned tools + rate limits)*

## Red-teaming as practice

*(internal testing, bounty programs, automated adversarial generation; pointer to safety/red-teaming.md)*

## Resources

- [Many-shot jailbreaking paper](https://www.anthropic.com/research/many-shot-jailbreaking)
- [Simon Willison — prompt injection](https://simonwillison.net/tags/prompt-injection/)

## Notes

*(none yet)*
