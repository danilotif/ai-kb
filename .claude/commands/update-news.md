---
description: Read the web broadly, synthesize an AI-news briefing covering models, features, research, business, and regulation; merge into existing stories where they overlap, otherwise prepend new ones to frontend/data/news.js.
allowed-tools: WebSearch WebFetch Read Edit Write
---

# /update-news

Refresh `frontend/data/news.js` with a fresh, **synthesized** AI-news briefing — themed stories with references, not a flat link list. Cast a wide net: anything AI-relevant from the last ~14 days. **Every story is durable.** New material extends overlapping stories rather than replacing them. Run this locally before pushing the repo.

## What to do

1. **Read the current file** at `frontend/data/news.js`. Note every existing story's headline, body, source URLs, and date — you will potentially extend any of them.

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

4. **Synthesize 4–8 themed candidate stories** from the fetched material. Group related items into a coherent arc. Aim for breadth — don't let one category dominate. Suggested theme slots (mix and match per news cycle):
   - *Frontier model releases* — closed-weights announcements (OpenAI, Anthropic, Google, xAI, Meta).
   - *Open-weights momentum* — open-source / open-weights releases and writeups (DeepSeek, Qwen, Mistral, IBM, Meta, NVIDIA, Hugging Face).
   - *Agents & tooling* — MCP, agent frameworks, computer-use, coding agents.
   - *Research & evals* — notable arXiv papers, new benchmarks, eval methodology.
   - *Product & features* — what shipped to users in ChatGPT/Claude/Gemini/Copilot/etc.
   - *Business & infra* — capex, M&A, partnerships, hiring/layoffs, chip supply, data-center buildouts.
   - *Policy & safety* — regulation, government action, safety/security incidents, content provenance.

   Each candidate has:
   - `headline` — short bold lead, ending in a period.
   - `body` — 2–4 sentences of synthesized prose. Cite labs/items by name. Be specific (model names, numbers if confirmed) and skeptical of unverified benchmark claims — flag aggregator-only numbers as such.
   - `sources` — the URLs that back the prose (2–6 typical). Each source is `{ title, url, source }` where `source` is the lab/site name.
   - `date` — `max()` of the source publish dates in this story (`YYYY-MM-DD`).

   **Never invent facts, URLs, or dates.** If a claim isn't in the fetched material, drop it. If you can't verify a URL, drop the source.

5. **Merge into the existing list.** For each candidate, decide: does it cover the *same underlying news* as an existing story, or is it genuinely new?

   - **Same news → extend the existing story.** Same news means same core development from the same actor(s) and roughly the same time window — e.g. "DeepSeek V4 release" and "Open-weights wave centered on DeepSeek V4" are the same news; "Anthropic's $40B Google deal" and "Anthropic's $900B funding talks five days later" are *not* — they're sequential moments in the same arc and may both deserve stories. To extend: rewrite the body to incorporate the new specifics (new benchmarks, new sources, new context), append any new sources that aren't already cited, and bump the `date` to `max(existing, new)`. Update the headline only if the new framing genuinely improves it. Don't dilute prose just to make room — pick what's load-bearing.
   - **New news → prepend as a new story.** Don't carry over phrasing from existing stories.
   - **Borderline → prefer extending.** A handful of slightly-overlapping story objects is worse than one well-curated one that the user can read top-to-bottom.

   Existing stories that aren't touched by any candidate stay verbatim.

6. **Sort by `date` descending.** No cap on story count — but if the file balloons past ~20 entries, mention it in the report so the user can prune.

7. **Rewrite** `frontend/data/news.js` with this exact shape:

   ```js
   // AI news briefing. Edit by hand or refresh via `/update-news`.
   // `/update-news` extends overlapping stories rather than replacing them — every story is durable.
   // Schema: { date (YYYY-MM-DD), headline, body, sources: [{ title, url, source }], note? }

   window.NEWS = [
     // ... stories, newest first
   ];
   ```

8. **Report back** to the user: how many existing stories were extended vs. left untouched, how many brand-new stories were added, the headlines of each (with a marker for new vs. extended), and the total source count. Flag if the list is approaching ~20.

## Rules

- **Synthesis, not stenography.** The body is your prose, not the source's marketing copy. Connect related items across labs and outlets when the story warrants it.
- **Primary sources first; press for context.** When a lab has its own post, cite that. Use tech press / newsletters when (a) the story crosses multiple labs, (b) only press has covered it, or (c) the angle is analytical (capex, regulation, market).
- **Never invent URLs, dates, or facts.** If you can't verify a claim, leave it out. If you can't verify a URL, drop the source.
- **Hedge unverified numbers.** If a benchmark or stat comes only from an aggregator/newsletter, attribute it in-prose ("reportedly", "per Import AI") rather than stating it as fact.
- **Do not commit or push.** This command only edits the file. The user reviews and commits.
- **Notes are optional and rare.** `note` is for editorial callouts on a single story; don't pad.
- **Dates as `YYYY-MM-DD`.** Convert relative dates ("2 days ago") to absolute using today's date.
- **No prose in the JS file** beyond the header comment shown above.
