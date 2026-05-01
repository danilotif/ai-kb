# AI Program

A personal, static dashboard for tracking what I know in AI, what I'm studying next, and curated news.

## Open it

Just open `index.html` in a browser. No build step, no dependencies.

```sh
open index.html      # macOS
```

## Edit content

- **Topics** — `data/topics.js`. Each entry: `name`, `category`, `description`, `status`, `tags`, `resources`, `date_added`.
- **News** — `data/news.js`. Each entry: `title`, `url`, `source`, `date`, optional `note`. Items added by `/update-news` carry `auto: true`; hand-added items are preserved.

Topics are grouped by `category` in the UI — adding a new category is just typing it on a topic.

Status values: `queued` · `studying` · `done`. The dashboard sorts by status and lets you filter by chip.

## Refresh news

Inside Claude Code, run:

```
/update-news
```

It fetches fresh AI news (Anthropic, OpenAI, DeepMind, Hugging Face, arXiv, HN), dedups against your current list, and rewrites `data/news.js`. Manual entries are preserved. Review the diff, then commit and push.

The command spec lives at `.claude/commands/update-news.md`.

## Files

```
index.html                     entry point
assets/styles.css              dark theme styles
assets/app.js                  rendering + grouping + filtering
data/topics.js                 hand-edited topic list (with categories)
data/news.js                   news list (manual + auto)
.claude/commands/update-news.md  /update-news slash command
```

## Hosting

Static — works as-is on GitHub Pages, Netlify, or any static host.
