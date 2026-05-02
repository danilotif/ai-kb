---
title: Coding-agent architectures
date_added: 2026-05-02
---

# Coding-agent architectures

The patterns that distinguish a good coding agent from a chat-with-edit-button. Most of the work is in the harness, not the model.

## Tool surface

*(file read/write/edit, shell, search/grep, browser, sub-agents; bash sandboxing)*

## Context strategy

*(what to put in context: full files vs slices, repo map, recent edits; CLAUDE.md / AGENTS.md style instruction files)*

## Planning vs reactive editing

*(when to ask the model to plan first, when to let it dive in; checkpointed plans; auto-mode)*

## Test/run loop

*(running tests after each edit; reading errors; binary-search debugging; the value of a fast inner loop)*

## Multi-file edits

*(transactional edits, conflict avoidance, ordering dependent changes)*

## Sub-agents and parallelism

*(dispatching independent searches; map-reduce over a codebase; isolated worktrees)*

## Memory across sessions

*(conversation compaction, persistent memory files, project-level instructions)*

## Harness vs model

*(why the same model feels very different across products; the harness is the product)*

## Resources

- [Building effective agents (Anthropic)](https://www.anthropic.com/research/building-effective-agents)

## Notes

*(none yet)*
