---
description: Read the web broadly, synthesize an AI-news briefing covering models, features, research, business, and regulation into themed stories, rewrite frontend/data/news.js (run before pushing).
allowed-tools: WebSearch WebFetch Read Edit Write
---

# /update-news

Refresh `frontend/data/news.js` with a fresh, **synthesized** AI-news briefing — themed stories with references, not a flat link list. Cast a wide net: anything AI-relevant from the last ~14 days. Run this locally before pushing the repo.

## What to do

1. **Read the current file** at `frontend/data/news.js`. Identify the manual stories (no `auto: true`) — these are preserved verbatim. **Every prior `auto: true` story will be discarded** and replaced with the freshly synthesized briefing; do not try to dedup or merge against them.

2. **Read the web broadly.** Use both `WebSearch` (for discovery and trend-spotting) and `WebFetch` (for confirming claims, titles, dates). Aim for the **last 14 days**. Cast wide:

   **Primary sources — lab/maker blogs (cite directly when possible):**
   - Anthropic — `https://www.anthropic.com/news`
   - OpenAI — `https://openai.com/news/`
   - Google DeepMind — `https://deepmind.google/discover/blog/`
   - Google AI / `blog.google/technology/ai/`
   - Meta AI — `https://ai.meta.com/blog/`
   - Mistral — `https://mistral.ai/news/`
   - xAI — `https://x.ai/news`
   - Cohere — `https://cohere.com/blog`
   - DeepSeek, Qwen/Alibaba, Moonshot, 01.AI, Tencent (search their official channels)
   - Hugging Face blog — `https://huggingface.co/blog`
   - arXiv recent in cs.CL, cs.AI, cs.LG — high-impact papers only

   **Tech press & analysis (good for cross-cutting themes — capex, M&A, regulation, infra, layoffs):**
   - TechCrunch, The Verge, Ars Technica, Wired, MIT Technology Review
   - The Information, Stratechery, Platformer, Bloomberg, Reuters, FT, WSJ
   - Newsletters: Import AI (Jack Clark), Ben's Bites, The Rundown AI, Last Week in AI, Interconnects (Nathan Lambert)

   **Community & signal:**
   - Hacker News front page — items about AI/LLMs/MCP/agents
   - Reddit r/LocalLLaMA, r/MachineLearning (release threads only, not memes)

   **Broad discovery searches** to surface stories you wouldn't find by URL alone:
   - `"AI news last 7 days"`, `"AI model release this week"`, `"new LLM <YYYY-MM>"`
   - `"AI regulation <YYYY-MM>"`, `"AI funding round <YYYY-MM>"`, `"AI layoffs <YYYY-MM>"`
   - `"MCP protocol news"`, `"AI agents news"`, `"open source LLM <YYYY-MM>"`

3. **Score and pick.** Cast wide on topic, narrow on quality. Cover anything genuinely AI-relevant:
   - **Always include if substantive:** new model releases (closed and open weights), new product/feature ships, MCP / agent / tooling updates, notable research papers, evals & benchmarks, prompt-caching / context-window / inference improvements, AI regulation & policy, major partnership/M&A, big infra/capex moves, hiring or layoff stories tied to AI strategy, security/safety incidents, jailbreaks/red-teaming, well-argued analysis essays.
   - **Skip:** generic VC funding rounds without strategic angle, recycled summary-of-summary listicles, social-media drama with no concrete development, low-effort SEO content, opinion pieces without primary sources or new data.
   - Prefer primary sources for citations whenever they exist. Use tech press and newsletters as **discovery aids** and to back synthesis claims you can't pin to a single lab.

4. **Synthesize 4–8 themed stories.** Group related items into a coherent arc. Aim for breadth across the AI landscape — don't let a single category dominate. Suggested theme slots (mix and match per news cycle):
   - *Frontier model releases* — closed-weights announcements (OpenAI, Anthropic, Google, xAI, Meta).
   - *Open-weights momentum* — open-source / open-weights releases and writeups (DeepSeek, Qwen, Mistral, IBM, Meta, NVIDIA, Hugging Face).
   - *Agents & tooling* — MCP, agent frameworks, computer-use, coding agents.
   - *Research & evals* — notable arXiv papers, new benchmarks, eval methodology.
   - *Product & features* — what shipped to users in ChatGPT/Claude/Gemini/Copilot/etc.
   - *Business & infra* — capex, M&A, partnerships, hiring/layoffs, chip supply, data-center buildouts.
   - *Policy & safety* — regulation, government action, safety/security incidents, content provenance.

   Each story has:
   - `headline` — short bold lead, ending in a period.
   - `body` — 2–4 sentences of synthesized prose. Cite the labs/items by name in-prose. Be specific (model names, numbers if confirmed) and skeptical of unverified benchmark claims — flag aggregator-only numbers as such.
   - `sources` — the URLs that back the prose (2–6 typical). Each source is `{ title, url, source }` where `source` is the lab/site name (e.g. "OpenAI", "TechCrunch", "arXiv", "Import AI").
   - `date` — `max()` of the source publish dates in this story (`YYYY-MM-DD`).
   - `auto: true`.

   **Never invent facts, URLs, or dates.** If a claim isn't in the fetched material, drop it. If the only support for a number is a single newsletter/aggregator, say so in-prose ("per The Rundown") rather than stating it as fact.

5. **Build the new list:**
   - Start with **manual** entries (no `auto: true` flag) preserved verbatim.
   - Append the freshly synthesized auto stories (any prior auto stories are discarded — no merge, no carryover).
   - Sort the final list by `date` descending.
   - Cap auto stories at **8**; manual stories are never trimmed.

6. **Rewrite** `frontend/data/news.js` with this exact shape:

   ```js
   // Manually curate AI news here OR run /update-news to refresh auto entries.
   // Auto-fetched items have `auto: true`. Manual items are preserved across runs.
   // Schema: { date (YYYY-MM-DD), headline, body, sources: [{ title, url, source }], note?, auto? }

   window.NEWS = [
     // ... stories, newest first
   ];
   ```

7. **Report back** to the user: how many manual stories preserved, how many new auto stories written, the theme of each, and the total source count. List the new headlines as bullets.

## Rules

- **Synthesis, not stenography.** The body is your prose, not the source's marketing copy. Connect related items across labs and outlets when the story warrants it.
- **Primary sources first; press for context.** When a lab has its own post, cite that. Use tech press / newsletters when (a) the story crosses multiple labs, (b) only press has covered it, or (c) the angle is analytical (capex, regulation, market).
- **Never invent URLs, dates, or facts.** If you can't verify a claim, leave it out. If you can't verify a URL, drop the source.
- **Hedge unverified numbers.** If a benchmark or stat comes only from an aggregator/newsletter, attribute it in-prose ("reportedly", "per Import AI") rather than stating it as fact.
- **Do not commit or push.** This command only edits the file. The user reviews and commits.
- **Notes are optional and rare.** `note` is for editorial callouts on a single story; don't pad.
- **Dates as `YYYY-MM-DD`.** Convert relative dates ("2 days ago") to absolute using today's date.
- **No prose in the JS file** beyond the header comment shown above.
