---
title: Model Context Protocol — basics
date_added: 2026-04-28
---

# Model Context Protocol — basics

An open spec from Anthropic for connecting LLM clients to tools, data sources, and prompt libraries. Aims to be "USB-C for AI".

## What problem it solves

*(every client used to ship its own tool integration; MCP is the standard wire format so a server written once works in many clients)*

## Architecture

*(client ↔ server over JSON-RPC 2.0; client speaks for the LLM, server exposes capabilities)*

## Primitives

*(tools — model-invokable functions; resources — readable URIs; prompts — server-supplied prompt templates)*

## Capabilities discovery

*(handshake: client advertises what it supports, server advertises which primitives it offers)*

## Roots and elicitation

*(roots: filesystem boundaries the server is allowed to see; elicitation: server asks client/user for additional input mid-call)*

## Sampling

*(server can ask the client's LLM to complete something; rare in practice, useful for sub-agents)*

## Auth

*(OAuth 2.1 with PKCE for remote servers; bearer tokens; client-initiated flows)*

## Versioning & evolution

*(spec is on a fast cadence; backward compatibility maintained via capability flags)*

## Resources

- [MCP docs](https://modelcontextprotocol.io)
- [MCP spec](https://spec.modelcontextprotocol.io)

## Notes

*(none yet)*
