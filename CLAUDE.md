# AI Program — project notes for Claude

## Purpose
A personal, static dashboard with two halves: a synthesized AI **News** briefing (refreshed via `/update-news`) and a **Knowledge Base** of long-form study documents kept as markdown under `resources/`. The KB is meant to grow into many substantive pages over time — it's a real knowledge base, not a flat list of bookmarks.

## Top-level layout

```
resources/        knowledge base — markdown source of truth (per category)
frontend/         static dashboard (HTML, JS, CSS, generated data, build script)
CLAUDE.md         this file
README.md         user-facing intro
.claude/          slash command specs (e.g. /update-news)
.gitignore
```

That's the whole repo. Anything else (build artifacts, IDE configs, etc.) should be gitignored.

## Architecture
- **Static HTML** at serve time — no dependencies, no framework. Open `frontend/index.html` directly or serve `frontend/` with any static host. There is one offline build step (`frontend/scripts/build-resources.py`) that converts `resources/*.md` into `frontend/data/resources.js` so the dashboard can read it under `file://`; the user runs this manually after editing markdown.
- **Two views, navbar-switched**:
  - **News** (default): synthesized briefing rendered from `frontend/data/news.js`.
  - **Knowledge Base**: a sidebar file-tree (folders = categories, files = study documents) with the selected document's markdown rendered in the main pane.
- **Routing**: hash-based with `pushState`/`popstate`. URL forms: `` (news), `#resources`, `#resources/<category-slug>/<file-slug>` (deep link to a specific document).
- **Code split into IIFE modules** under `window.App`, loaded via plain `<script>` tags in load order: util → resources/briefing → app.
- **News refresh** via `/update-news` slash command (see `.claude/commands/update-news.md`) — Claude reads the web, synthesizes 4–8 themed stories, and rewrites `frontend/data/news.js`. Manual stories are preserved; auto stories are discarded each run. News does **not** mirror into `resources/` — news and KB are separate concerns.

## frontend/ map
```
frontend/
  index.html                  page structure (hero + nav, news view, resources view with sidebar+content)
  assets/
    styles.css                dark theme, single stylesheet
    util.js                   window.App.el — small DOM helper
    resources.js              window.App.resources — file-tree sidebar, hash routing, minimal markdown→HTML renderer
    briefing.js               window.App.briefing — render the synthesized news briefing
    app.js                    nav (tabs + pushState/popstate) and DOMContentLoaded bootstrap
  data/
    resources.js              GENERATED KB index (window.RESOURCES) — tree + content baked in for file:// support
    news.js                   news stories (window.NEWS) — manual + auto entries
  scripts/
    build-resources.py        regenerates frontend/data/resources.js by scanning ../resources/*.md (stdlib only)
```

## resources/ knowledge base
The `resources/` folder is the source of truth. Each file is a long-form study document with frontmatter:

```markdown
---
title: <human title>
category: <category display name>
date_added: YYYY-MM-DD
---

# <Title>

<Long-form content. Sections, examples, anything.>

## Resources

- [Source](https://...)

## Notes

_(your notes here)_
```

Categories are recognized only if their slug appears in `CATEGORY_NAMES` in `frontend/scripts/build-resources.py`. Adding a new category = add an entry to that dict, then create the directory.

After editing any `resources/*.md`, regenerate the index from the repo root:

    python3 frontend/scripts/build-resources.py

This rewrites `frontend/data/resources.js`. The script is stdlib-only, runs in <100ms. The dashboard cannot `fetch()` markdown from `file://`, which is why this offline bake step exists. Alternative: ask Claude to "rebuild the KB index" — same output, different mechanism.

The minimal markdown subset rendered by `frontend/assets/resources.js` covers `# H1`, `## H2`, paragraphs, unordered lists with `- `, links, inline code, bold, italic. Tables, blockquotes, images, and ordered lists are not rendered — extend `renderMarkdown` if needed.

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

## Design decisions
- Vanilla over framework — keeps the repo accessible and zero-friction to edit.
- JS data files over JSON — avoids needing a local server.
- Dark theme only.
- News and KB are separate concerns: news is ephemeral (refreshed on demand, replaces auto entries), KB documents are durable study pages you accumulate over time.
- Single-level hierarchy (category → document). Can deepen later if needed.
- Top level is intentionally minimal: `resources/`, `frontend/`, `CLAUDE.md`, `README.md`. New top-level entries should be a deliberate decision, not accidental sprawl.

## /update-news workflow
1. User runs `/update-news` in Claude Code.
2. Claude reads current `frontend/data/news.js`, notes existing URLs.
3. Claude fetches news from configured sources (Anthropic, OpenAI, DeepMind, HF, Mistral, arXiv cs.CL/cs.AI, HN AI threads, tech press).
4. Claude scores by relevance, dedups, marks fetched items `auto: true`.
5. Claude rewrites `frontend/data/news.js` (manual items preserved verbatim, auto items capped at 8).
6. User reviews diff, commits, pushes.

## Backlog / not yet done
- No search box (across the KB or news).
- No sub-categories under categories (single-level only).
- No tests.
- `/update-news` is unscheduled — runs only on demand.

## Conventions
- KB documents are edited as markdown under `resources/`. After editing, run `python3 frontend/scripts/build-resources.py`.
- News is hand-edited in `frontend/data/news.js` for manual entries; auto entries come from `/update-news`.
- Adding a new category = add slug → display-name to `CATEGORY_NAMES` in `frontend/scripts/build-resources.py`, then create the directory.
- The `slug` shown in the sidebar is the filename stem (e.g. `transformers.md` → `transformers`), so name files for what they should display.
