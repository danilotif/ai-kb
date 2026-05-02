---
title: MCP clients
date_added: 2026-05-02
---

# MCP clients

What clients exist, how to wire servers up to them, and what each client supports.

## Claude Desktop

*(`claude_desktop_config.json`; stdio servers via `command`+`args`; remote via `url`; how Claude exposes tools to the model)*

## Claude Code

*(per-project `.mcp.json`, settings.json `mcpServers`; resources surfaced via slash commands; permission flow)*

## Cursor / Windsurf / Cline

*(each adds MCP support with its own config UX; same servers work)*

## Copilot CLI / VS Code

*(GitHub's MCP integration; auth-forwarding patterns)*

## Building your own client

*(SDK exposes the client side; useful when embedding MCP into a custom agent harness)*

## Capability matrix

*(which clients support tools, resources, prompts, sampling, elicitation; check before building a feature that depends on a rare primitive)*

## Debugging

*(MCP Inspector standalone, server logs, the request log in Claude Desktop)*

## Resources

- [Claude Desktop MCP setup](https://modelcontextprotocol.io/quickstart/user)

## Notes

*(none yet)*
