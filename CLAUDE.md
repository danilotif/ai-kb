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
- **Static HTML** at serve time — no dependencies, no framework. Open `frontend/index.html` directly or serve `frontend/` with any static host. There is one offline build step (`frontend/scripts/build-resources.py`) that converts the `resources/` markdown tree into `frontend/data/resources.js` so the dashboard can read it under `file://`; the user runs this manually after editing markdown.
- **Two views, navbar-switched**:
  - **News** (default): synthesized briefing rendered from `frontend/data/news.js`.
  - **Knowledge Base**: a sidebar file-tree (category → theory|practice → documents) with the selected document's markdown rendered in the main pane.
- **Routing**: hash-based with `pushState`/`popstate`. URL forms: `` (news), `#resources`, `#resources/<category-slug>/<kind>/<file-slug>` where `<kind>` is `theory` or `practice` (deep link to a specific document).
- **Code split into IIFE modules** under `window.App`, loaded via plain `<script>` tags in load order: util → resources/briefing → app.
- **News refresh** via `/update-news` slash command (see `.claude/commands/update-news.md`) — Claude reads the web, synthesizes 4–8 themed candidate stories, and merges them into `frontend/data/news.js`: candidates that cover the same underlying news as an existing story extend it (new sources appended, body rewritten, date bumped); genuinely new candidates are prepended. Every story is durable — nothing is discarded automatically. News does **not** mirror into `resources/` — news and KB are separate concerns.

## frontend/ map
```
frontend/
  index.html                  page structure (hero + nav, news view, resources view with sidebar+content);
                              uses data-config / data-config-html attrs as placeholders, populated from window.CONFIG on load
  assets/
    styles.css                dark theme, single stylesheet
    util.js                   window.App.el — small DOM helper
    resources.js              window.App.resources — file-tree sidebar, hash routing, minimal markdown→HTML renderer
    briefing.js               window.App.briefing — render the synthesized news briefing
    app.js                    config application + nav (tabs + pushState/popstate) + DOMContentLoaded bootstrap
  data/
    config.js                 DOMAIN-SPECIFIC settings (window.CONFIG): site name, page title, tab labels, footer
    resources.js              GENERATED KB index (window.RESOURCES) — tree + content baked in for file:// support
    news.js                   news stories (window.NEWS) — durable; refreshed via /update-news (extends overlapping stories, prepends new ones)
  scripts/
    build-resources.py        regenerates frontend/data/resources.js by scanning ../resources/<cat>/<theory|practice>/*.md (stdlib only)
```

## resources/ knowledge base
The `resources/` folder is the source of truth. Layout is `resources/<category>/<kind>/<slug>.md` where `<kind>` is `theory` or `practice`. Each file is a long-form study document with frontmatter:

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

Categories are auto-discovered from `resources/*/` directory listings. Display names default to a slugified-back version (`local-models` → `Local models`); to override (e.g. `mcp` → `MCP`, `tips-and-tricks` → `Tips & tricks`), edit `resources/_categories.json`. Directories whose name starts with `.` or `_` are ignored, so the override file is invisible to the dashboard.

Inside each category, the build script only walks `theory/` and `practice/` subfolders. Files placed at the category root (e.g. `resources/agents/foo.md`) still get picked up but are treated as `theory` with a stderr warning — move them into the right subfolder to silence it. The current categories (17 in total): `agents`, `coding-agents`, `data`, `evaluation`, `fine-tuning`, `foundations`, `local-models`, `mcp`, `multimodal`, `new-models`, `policy`, `prompt-engineering`, `reasoning`, `retrieval`, `safety`, `serving`, `tips-and-tricks`. New categories started 2026-05-01 (`coding-agents`, `data`, `multimodal`, `policy`, `prompt-engineering`, `reasoning`, `safety`, `serving`) ship with a single `theory/overview.md` placeholder for the user to expand.

After editing any markdown in `resources/`, regenerate the index from the repo root:

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
  note?: string              // editorial callout (italic, muted) — optional
}
```

## Design decisions
- Vanilla over framework — keeps the repo accessible and zero-friction to edit.
- JS data files over JSON — avoids needing a local server.
- Dark theme only.
- News and KB are separate concerns, but both are durable: `/update-news` extends overlapping stories rather than discarding them, so the news log accumulates over time alongside the KB.
- Two-level hierarchy: category → theory|practice → document. Theory holds explanatory/reference notes; practice holds recipes, commands, and how-to docs. The split is enforced by the build script.
- Top level is intentionally minimal: `resources/`, `frontend/`, `CLAUDE.md`, `README.md`. New top-level entries should be a deliberate decision, not accidental sprawl.

## /update-news workflow
1. User runs `/update-news` in Claude Code.
2. Claude reads current `frontend/data/news.js`, notes existing stories (headline, body, sources, date).
3. Claude fetches news from configured sources (Anthropic, OpenAI, DeepMind, HF, Mistral, arXiv cs.CL/cs.AI, HN AI threads, tech press) and synthesizes 4–8 themed candidate stories.
4. For each candidate, Claude decides: same news as an existing story → extend it (rewrite body, append new sources, bump date to `max`); genuinely new news → prepend as a new story. Untouched existing stories stay verbatim.
5. Claude rewrites `frontend/data/news.js`, sorted by date desc. No automatic discard, no auto/manual distinction, no hard cap (Claude flags if the list passes ~20).
6. User reviews diff, commits, pushes.

## Backlog / not yet done
- No search box (across the KB or news).
- Two-level hierarchy only (category → theory|practice → document). Going deeper would require changes in the build script and the sidebar renderer.
- Several new categories are stubs (`coding-agents`, `data`, `multimodal`, `policy`, `prompt-engineering`, `reasoning`, `safety`, `serving`) — only contain a placeholder `theory/overview.md`. Fill with study content over time.
- `prompt-engineering` overlaps with `tips-and-tricks/practice/prompt-patterns.md`; consider moving the file into `prompt-engineering/practice/` once it grows.
- `new-models/theory/frontier-evals.md` overlaps with `evaluation/`; consider consolidating.
- No tests.
- `/update-news` is unscheduled — runs only on demand.

## Conventions
- KB documents are edited as markdown under `resources/<category>/<theory|practice>/<slug>.md`. After editing, run `python3 frontend/scripts/build-resources.py`.
- News is hand-edited in `frontend/data/news.js` or refreshed via `/update-news`; both flows produce the same shape (no auto/manual distinction). `/update-news` extends overlapping stories instead of replacing them.
- Adding a new category = `mkdir -p resources/<slug>/{theory,practice}` and drop at least one `.md` file into one of them (otherwise the category won't appear in the sidebar). Override the display name in `resources/_categories.json` if the slug doesn't title-case nicely.
- The `slug` shown in the sidebar is the filename stem (e.g. `transformers.md` → `transformers`), so name files for what they should display.
- Decide theory vs practice by audience need: theory = "I want to understand X" (concepts, derivations, reference). Practice = "I want to do X" (commands, recipes, workflows, tool how-tos).

## Forking this for a new domain
The framework (`frontend/`, build script, KB tree viewer) is domain-agnostic. To repurpose for marketing/games/finance/anything:
1. Edit `frontend/data/config.js` — set `siteName`, `pageTitle`, tab labels and headings, footer.
2. Replace `resources/*/` content with your domain's markdown.
3. Update `resources/_categories.json` if your slugs need pretty display names.
4. Rewrite `.claude/commands/update-news.md` for your domain (or add a new command, e.g. `/update-trends`) — change the source list and theme slots; the rest of the workflow (synthesize themed stories, write to `frontend/data/news.js`) stays the same.
5. Run `python3 frontend/scripts/build-resources.py`.

Nothing else in the framework should need editing.
