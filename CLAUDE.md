# AI Program — project notes for Claude

## Purpose
A personal, static dashboard for tracking AI knowledge: topics known, topics queued for study, and a hand-curated news list. Knowledge tracker (passive curation) — not an active study workspace, not a project sandbox.

## Architecture
- **Static HTML** — no build step, no dependencies, no framework. Open `index.html` directly or serve it.
- **Data lives in JS files** (`data/topics.js`, `data/news.js`) that assign to `window.TOPICS` / `window.NEWS`. Chosen over JSON to avoid CORS issues when opening from `file://`.
- **Three views, navbar-switched**: "News" (synthesized briefing), "Knowledge Base" (sidebar tree of markdown files in `resources/`), and "Topics". The navbar lives in the hero; only one section is visible at a time. Default view is News. Deep-linkable: `#topics`, `#resources`, and `#resources/<theme>/<slug>` for a specific KB page; News uses the bare URL. Routing is hash-based with `pushState` + `popstate` for back/forward support.
- **Code split into IIFE modules** under `window.App`. Each script is loaded via a separate `<script>` tag in `index.html`; load order matters (util → topics/briefing → app). No build step, no module loader.
- **News refresh** via Claude Code slash command `/update-news` (see `.claude/commands/update-news.md`) — reads the web broadly (lab blogs, tech press, newsletters, arXiv, HN), synthesizes 4–8 themed stories spanning model releases, products/features, agents/tooling, research/evals, business/infra, and policy/safety, and rewrites `data/news.js` locally before push. Primary sources are preferred for citations; press is used for cross-cutting themes. Prior auto stories are discarded each run; manual stories are preserved.

## File map
```
index.html                    page structure (hero + nav, news / resources / topics views)
assets/styles.css             dark theme, single stylesheet
assets/util.js                exposes window.App.el() — small DOM helper, shared by other modules
assets/topics.js              window.App.topics — group by category and render topic cards
assets/briefing.js            window.App.briefing — render the synthesized news briefing (with old-schema fallback)
assets/resources.js           window.App.resources — sidebar tree, file routing, minimal markdown→HTML renderer
assets/app.js                 nav (tabs + URL hash + popstate/pushState) and DOMContentLoaded bootstrap
data/topics.js                hand-edited topic list (window.TOPICS)
data/news.js                  news stories (window.NEWS) — manual + auto entries
data/resources.js             generated KB index (window.RESOURCES) — tree + content baked in for file:// support
resources/                    persistent KB mirror of news stories, organized by macro theme (one md file per story)
scripts/build-resources.py    regenerates data/resources.js by scanning resources/*.md (no deps, just stdlib)
.claude/commands/update-news.md  /update-news slash command spec
README.md                     user-facing intro
.gitignore                    ignores .superpowers/ brainstorming artifacts
CLAUDE.md                     this file
```

## resources/ knowledge base
Each story in `data/news.js` is also mirrored as a markdown file under
`resources/<theme>/YYYY-MM-DD-slug.md`. The mirror is the **source of truth**
for the Knowledge Base view in the dashboard — but because the dashboard runs
from `file://` (no server), the markdown can't be `fetch()`-ed at runtime.
Instead, `scripts/build-resources.py` walks `resources/`, parses frontmatter
+ H1, and bakes the entire tree (including raw markdown content per file)
into `data/resources.js`, which is loaded as a regular `<script>` tag. Run
the script after any edit under `resources/`:

    python3 scripts/build-resources.py

Theme slots: `frontier-models/`, `open-weights/`, `agents-and-tooling/`,
`business-and-infra/`, `policy-and-safety/`, `research-and-evals/`. A
`products-and-features/` slot is reserved — create the directory the first
time it has content. The KB view picks up new themes automatically as long
as the slug appears in `THEME_NAMES` in `build-resources.py`. See
`resources/README.md` for the file format.

The minimal markdown subset rendered by `assets/resources.js` covers what
`/update-news`-generated stories use: `# H1`, `## H2`, paragraphs, unordered
lists with `- `, links, inline code, and bold. Tables, blockquotes, images,
and ordered lists are not rendered — extend `renderMarkdown` if needed.

## Data shapes

**Topic:**
```
{
  id, name,
  category,           // hierarchy header (e.g. "MCP", "Local models", "Foundations")
  description,
  status?: "queued" | "studying" | "done",  // tolerated in data but not surfaced in UI
  tags: string[],
  resources: [{title, url}],
  date_added: "YYYY-MM-DD"
}
```
Topics are grouped under their `category` in the UI and sorted alphabetically by name within each group. Categories are inferred from topic data (no separate registry). Category order: alphabetical, with `Uncategorized` last. The `status` field is currently ignored by the renderer.

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
News is rendered as a vertical briefing: each story is a paragraph (bold inline headline + prose) followed by a numbered "References" list of sources. `/update-news` preserves manual stories (no `auto`) verbatim and only rewrites `auto: true` entries. The command synthesizes 3–6 themed stories per refresh — it does **not** produce a flat link list.

## Design decisions
- Vanilla over framework — keeps the repo accessible and zero-friction to edit.
- JS data files over JSON — avoids needing a local server.
- Dark theme only — single intentional look; no theme toggle yet.
- Hierarchy is **single-level** (category → topic). Can deepen to subcategories later if needed.
- News is hybrid: manual bookmarks + AI-fetched items via `/update-news`. No automation runs in CI; refresh is a deliberate local action.
- Status filtering and badges were removed (2026-05-01) — UI is now passive: News-first, Topics as a flat grouped list with no per-topic state shown.

## /update-news workflow
1. User runs `/update-news` in Claude Code.
2. Claude reads current `data/news.js`, notes existing URLs.
3. Claude fetches news from configured sources (Anthropic, OpenAI, DeepMind, HF, Mistral, arXiv cs.CL/cs.AI, HN AI threads).
4. Claude scores by relevance (model releases, MCP, local models, agents, evals get boosted), dedups, marks fetched items `auto: true`.
5. Claude rewrites `data/news.js` (manual items preserved, auto items capped at 30 total).
6. User reviews diff, commits, pushes.

## Backlog / not yet done
- No search box.
- Topics have no detail/expanded view — only the card.
- No sub-categories (single-level hierarchy only).
- No tests.
- `/update-news` is unscheduled — runs only on demand.
- CSS for the now-unused `.stats`, `.stat`, `.chip`, `.filters`, `.badge` classes is still in `assets/styles.css` — dead but harmless.

## Conventions
- Edits to topics/news are hand-edits to the JS files; no UI for adding entries.
- When adding a topic, give it a stable `id` (used for future deep-linking) and a `category`.
- Adding a new category is just typing it on a topic — the dashboard picks it up automatically.
