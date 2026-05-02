---
title: Red-teaming
date_added: 2026-05-02
---

# Red-teaming

Adversarial testing of models — find what makes them misbehave before someone in production does.

## Manual red-teaming

*(domain experts, security researchers, novelist-types; iterative play; the source of most surprising failure modes)*

## Automated red-teaming

*(model-vs-model attack generation; gradient-based attacks (GCG); evolutionary search; far cheaper at scale, finds different bugs than humans)*

## What to red-team

*(refusals on harmful, robustness to jailbreaks, prompt-injection resistance, structured-output integrity, multi-turn drift)*

## CBRN and cyber evals

*(uplift studies — does the model meaningfully help an attacker; required by frontier-lab risk frameworks; shared with AISIs)*

## Bug bounty programs

*(Anthropic, OpenAI, Google with public bounty for model jailbreaks and hazards; payout schedules)*

## How to integrate red-team findings

*(triage by severity × likelihood, fold into training data, classifier rules, output filters, public model card disclosure)*

## Limits

*(no test set is complete; novel attacks emerge faster than defenses; defense in depth, not a single fix)*

## Resources

- [Anthropic red-teaming](https://www.anthropic.com/research/red-teaming-language-models)
- [GCG attack paper](https://arxiv.org/abs/2307.15043)

## Notes

*(none yet)*
