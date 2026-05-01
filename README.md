# AI Program

A personal AI knowledge base + news briefing, served as a static dashboard.

- **Knowledge Base** — long-form study documents, one markdown file per topic, organized by category under `resources/`.
- **News** — synthesized AI-news briefing in `frontend/data/news.js`, refreshed via the `/update-news` slash command.

## Open it

```sh
open frontend/index.html      # macOS
```

No build step, no dependencies. Works from `file://`.

## Edit the knowledge base

Add or edit markdown under `resources/<category>/<slug>.md`:

```markdown
---
title: Your title
category: Foundations
date_added: 2026-05-01
---

# Your title

Long-form content...

## Resources

- [Source](https://...)

## Notes

_(your notes here)_
```

Then regenerate the index so the dashboard sees the new file:

```sh
python3 frontend/scripts/build-resources.py
```

Categories are recognized from `CATEGORY_NAMES` in that script — add new ones there before creating their directory.

## Refresh the news

Inside Claude Code:

```
/update-news
```

Synthesizes 4–8 themed stories from primary sources + tech press, rewrites `frontend/data/news.js`. Manual entries are preserved. Review the diff, commit, push.

The command spec lives at `.claude/commands/update-news.md`.

## Layout

```
resources/                          knowledge base — markdown source of truth
frontend/                           static dashboard
  index.html
  assets/                           styles + JS modules
  data/
    resources.js                    generated KB index (do not edit by hand)
    news.js                         hand- and auto-curated news briefing
  scripts/
    build-resources.py              regenerates data/resources.js from resources/*.md
.claude/commands/update-news.md     /update-news slash command
CLAUDE.md                           project notes for Claude (architecture, conventions)
README.md                           this file
```

## Hosting

Static — works as-is on GitHub Pages, Netlify, or any static host. Point the host at the `frontend/` directory (or copy `frontend/` to the deploy root).
