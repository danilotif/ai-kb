# AI Program — project notes for Claude

## Purpose
A personal, static dashboard for tracking AI knowledge: a curated list of AI study topics rendered as a browsable knowledge base, plus a separate hand-curated news briefing. Knowledge tracker (passive curation) — not an active study workspace, not a project sandbox.

## Architecture
- **Static HTML** — no build step at serve time, no dependencies, no framework. Open `index.html` directly or serve it. There is one offline build step (`scripts/build-topics.py`) that converts `topics/*.md` into `data/topics.js` so the dashboard can read it under `file://`; the user runs this manually after editing markdown.
- **Two views, navbar-switched**:
  - **News** (default): synthesized briefing rendered from `data/news.js`.
  - **Topics**: a sidebar file-tree (folders = categories, files = study topics) with the selected topic's markdown rendered in the main pane. The Topics view is the knowledge base.
- **Routing**: hash-based with `pushState`/`popstate`. URL forms: `` (news), `#topics`, `#topics/<category-slug>/<file-slug>` (deep link to a specific topic).
- **Code split into IIFE modules** under `window.App`, loaded via plain `<script>` tags in load order: util → topics/briefing → app.
- **News refresh** via `/update-news` slash command (see `.claude/commands/update-news.md`) — Claude reads the web, synthesizes 4–8 themed stories, and rewrites `data/news.js`. Manual stories are preserved; auto stories are discarded each run. News does **not** mirror into `topics/` — news and topics are separate concerns.

## File map
```
index.html                    page structure (hero + nav, news view, topics view with sidebar+content)
assets/styles.css             dark theme, single stylesheet
assets/util.js                window.App.el — small DOM helper
assets/topics.js              window.App.topics — file-tree sidebar, hash routing, minimal markdown→HTML renderer
assets/briefing.js            window.App.briefing — render the synthesized news briefing
assets/app.js                 nav (tabs + pushState/popstate) and DOMContentLoaded bootstrap
data/topics.js                generated KB index (window.TOPICS) — tree + content baked in for file:// support
data/news.js                  news stories (window.NEWS) — manual + auto entries
topics/                       source of truth for the KB: <category>/<slug>.md
scripts/build-topics.py       regenerates data/topics.js by scanning topics/*.md (stdlib only)
.claude/commands/update-news.md  /update-news slash command spec
README.md                     user-facing intro
.gitignore                    ignores .superpowers/, .obsidian/
CLAUDE.md                     this file
```

## topics/ knowledge base
The `topics/` folder is the source of truth for study material. Layout:

```
topics/
  foundations/
    transformers.md
    tokenization.md
    diffusion.md
  fine-tuning/
    lora.md
    rlhf.md
  retrieval/
    rag.md
  agents/
    agentic-systems.md
  mcp/
    mcp-basics.md
    mcp-servers.md
  local-models/
    ollama.md
    quantization.md
  new-models/
    claude-4x.md
    frontier-evals.md
  evaluation/
    evals-design.md
  tips-and-tricks/
    prompt-patterns.md
    caching-cost.md
```

Each file is a study page with frontmatter:

```markdown
---
title: <human title>
category: <category display name>
date_added: YYYY-MM-DD
---

# <Title>

<Description / first pass / explanation.>

## Resources

- [Source](https://...)

## Notes

_(your notes here)_
```

Categories are recognized only if their slug appears in `CATEGORY_NAMES` in `scripts/build-topics.py`. Adding a new category = add an entry to that dict, then create the directory.

After editing any `topics/*.md`, regenerate the index:

    python3 scripts/build-topics.py

This rewrites `data/topics.js`. The script is stdlib-only, runs in <100ms. The dashboard cannot `fetch()` markdown from `file://`, which is why this offline bake step exists. (If you'd rather avoid Python, Claude can also regenerate `data/topics.js` directly given the markdown — same output, different mechanism.)

The minimal markdown subset rendered by `assets/topics.js` covers `# H1`, `## H2`, paragraphs, unordered lists with `- `, links, inline code, bold, and italic. Tables, blockquotes, images, and ordered lists are not rendered — extend `renderMarkdown` if needed.

## Data shapes

**News story** (briefing-style, synthesized from multiple sources):
```
{
  date: "YYYY-MM-DD",                    // the most recent source's date
  headline: "Frontier model releases keep coming.",   // bold lead, period-terminated
  body: "OpenAI shipped GPT-5.5 ... Mistral followed with Medium 3.5 ...",
  sources: [
    { title, url, source }   // source = lab/site name e.g. "OpenAI", "arXiv"
  ],
  note?: string,             // editorial callout (italic, muted) — manual entries only
  auto?: true                // set when written by /update-news; absent for manual entries
}
```
News is rendered as a vertical briefing: each story is a paragraph (bold inline headline + prose) followed by a numbered "References" list of sources. `/update-news` preserves manual stories (no `auto`) verbatim and only rewrites `auto: true` entries.

## Design decisions
- Vanilla over framework — keeps the repo accessible and zero-friction to edit.
- JS data files over JSON — avoids needing a local server.
- Dark theme only — single intentional look; no theme toggle yet.
- News and Topics are separate concerns: news is ephemeral (refreshed on demand, replaces auto entries), topics are durable study pages you accumulate over time.
- Single-level hierarchy (category → topic). Can deepen later if needed.

## /update-news workflow
1. User runs `/update-news` in Claude Code.
2. Claude reads current `data/news.js`, notes existing URLs.
3. Claude fetches news from configured sources (Anthropic, OpenAI, DeepMind, HF, Mistral, arXiv cs.CL/cs.AI, HN AI threads, tech press).
4. Claude scores by relevance, dedups, marks fetched items `auto: true`.
5. Claude rewrites `data/news.js` (manual items preserved verbatim, auto items capped at 8).
6. User reviews diff, commits, pushes.

## Backlog / not yet done
- No search box (across topics or news).
- No sub-categories under categories (single-level only).
- No tests.
- `/update-news` is unscheduled — runs only on demand.

## Conventions
- Topics are edited as markdown under `topics/`. After editing, run `python3 scripts/build-topics.py`.
- News is hand-edited in `data/news.js` for manual entries; auto entries come from `/update-news`.
- Adding a new topic category = add the slug→display-name to `CATEGORY_NAMES` in `scripts/build-topics.py`, then create the directory.
- The `slug` shown in the sidebar is the filename stem (e.g. `transformers.md` → `transformers`), so name files for what they should display.
