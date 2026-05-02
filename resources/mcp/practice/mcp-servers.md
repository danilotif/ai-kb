---
title: Building MCP servers
date_added: 2026-04-29
---

# Building MCP servers

How to actually ship a server: SDK, project layout, tool design, deployment.

## Pick a language

*(Python — `mcp` SDK; TypeScript — `@modelcontextprotocol/sdk`; Go, Rust, Kotlin community SDKs)*

## Project skeleton

*(server entrypoint, tool definitions, capability declarations; `mcp.create_server` style)*

## Defining tools

*(name, description, JSON schema; descriptions are the prompt — write them for the model)*

## Defining resources

*(URI scheme you own, list/get pattern, MIME types; let the client cache)*

## Defining prompts

*(parameterized templates the user picks from a slash-menu; useful for canned workflows)*

## Local dev

*(stdio transport + Claude Desktop or `mcp-cli`; iterative loop is fast)*

## Deploying remote

*(streamable HTTP, OAuth 2.1; Cloudflare Workers, Lambda, plain Fastify/FastAPI; reverse-proxy considerations)*

## Auth flows

*(dynamic client registration, PKCE, refresh tokens; what to store, what to forward downstream)*

## Testing

*(mcp-inspector, integration tests, contract tests against the spec)*

## Common pitfalls

*(too-fat tools, vague descriptions, non-idempotent reads, leaking secrets in errors, mishandling cancellation)*

## Resources

- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)

## Notes

*(none yet)*
