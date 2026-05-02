---
title: Agent frameworks
date_added: 2026-05-02
---

# Agent frameworks

What's available, what each is good for, when to skip the framework.

## The landscape

*(Anthropic Agent SDK, OpenAI Agents SDK, LangGraph, LlamaIndex, CrewAI, AutoGen, Mastra, Inngest)*

## Anthropic Agent SDK

*(tools, sub-agents, file-system tools, harness model — same one Claude Code uses)*

## OpenAI Agents SDK

*(tools, handoffs, tracing; tight integration with Responses API)*

## LangGraph

*(graph-state model, checkpoints, human-in-the-loop pause/resume)*

## CrewAI / AutoGen

*(role-based multi-agent abstractions; high ceiling, opinionated)*

## Rolling your own

*(when a 50-line while-loop beats a framework; tool schema + chat completion + JSON parse)*

## How to choose

*(single agent + tools → SDK or DIY; complex graph with branching → LangGraph; multi-role swarm → CrewAI/AutoGen)*

## Resources

- [Anthropic Agent SDK](https://docs.anthropic.com/en/api/agent-sdk)
- [OpenAI Agents SDK](https://github.com/openai/openai-agents-python)
- [LangGraph](https://langchain-ai.github.io/langgraph/)

## Notes

*(none yet)*
