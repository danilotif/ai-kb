---
title: Agentic systems
date_added: 2026-04-20
---

# Agentic systems

What turns an LLM into an "agent": a loop, a set of tools, and a stopping condition. Theory of how the loop is structured and how it fails.

## The minimal agent loop

*(model → tool call → observation → model; the ReAct pattern; how this differs from a single-shot completion)*

## Tools as the action space

*(tools = the agent's verbs; small focused tools beat sprawling ones; tool descriptions are part of the prompt)*

## Planning vs reactive

*(plan-then-execute vs step-by-step; when an explicit plan helps, when it just adds latency)*

## Memory and state

*(scratchpad, episodic memory, retrieval over past traces; what to persist vs what to recompute)*

## Stopping conditions

*(max steps, "I am done" tokens, deterministic halt checks; runaway loops as the default failure mode)*

## Failure modes

*(tool-call hallucination, infinite loops, premature giving up, context window blowout, observation overload)*

## Single-agent vs multi-agent

*(when to split work across agents; orchestrator/worker; pointer to multi-agent.md)*

## Resources

- [Building effective agents](https://www.anthropic.com/research/building-effective-agents)
- [ReAct paper](https://arxiv.org/abs/2210.03629)

## Notes

*(none yet)*
