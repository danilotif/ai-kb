---
title: Steering coding agents
date_added: 2026-05-02
---

# Steering coding agents

Prompting patterns that work across coding agents (Claude Code, Cursor, Codex). What to put in instruction files, how to phrase tasks.

## Project instruction files

*(CLAUDE.md / AGENTS.md / .cursorrules; what belongs there vs in conversation; layout doc, conventions, anti-patterns)*

## Task framing

*(state the goal, the constraints, and the done-condition; avoid open-ended "look around")*

## Context curation

*(point at the right files; let the agent search vs hand-feeding; the cost of too much context)*

## Plan-then-execute

*(when to force a plan first; reviewing the plan before letting the agent run)*

## Verification baked in

*(ask for tests, ask for the actual command output, never trust "I made the change")*

## Common anti-patterns

*(vague tasks, no done-condition, "fix all the things", letting the agent commit without review)*

## Recovery when it goes off

*(course-correct mid-stream, /clear and re-prompt, revert and try a smaller task)*

## Resources

*(none yet)*

## Notes

*(none yet)*
