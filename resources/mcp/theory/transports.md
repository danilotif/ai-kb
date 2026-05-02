---
title: MCP transports
date_added: 2026-05-02
---

# MCP transports

How bytes get between client and server. Choice of transport changes deployment story but not the protocol on top.

## stdio

*(client launches server as a child process; pipe stdin/stdout for JSON-RPC; default for local servers; no networking concerns)*

## Streamable HTTP

*(POST + SSE pattern; single endpoint; supersedes the older HTTP+SSE transport; the standard for remote servers)*

## SSE (legacy)

*(deprecated but still seen; two endpoints, one for SSE stream, one for POSTs)*

## When to use which

*(local dev → stdio; remote / multi-tenant / browser-hosted → streamable HTTP; never roll your own)*

## Auth on remote transports

*(OAuth 2.1, dynamic client registration, PKCE; bearer tokens forwarded with each request)*

## Reconnection & state

*(servers should be roughly stateless across reconnects; session ids let clients resume)*

## Hosting patterns

*(behind a load balancer, per-tenant servers, edge-hosted on Cloudflare Workers etc.)*

## Resources

- [MCP transports docs](https://modelcontextprotocol.io/docs/concepts/transports)

## Notes

*(none yet)*
