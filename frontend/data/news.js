// Manually curate AI news here OR run /update-news to refresh auto entries.
// Auto-fetched items have `auto: true`. Manual items are preserved across runs.
// Schema: { date (YYYY-MM-DD), headline, body, sources: [{ title, url, source }], note?, auto? }

window.NEWS = [
  {
    date: "2026-05-01",
    headline: "MCP quietly becomes enterprise plumbing.",
    body:
      "What started as an Anthropic protocol is showing up as default glue in enterprise stacks. Adobe's CX Enterprise wraps agents, skills, and MCP endpoints into a customer-experience platform; Databricks rolled out Unity AI Gateway, extending Unity Catalog's governance to cover which agents can hit which MCP servers and tools; and AdKit shipped an MCP service that lets Claude/ChatGPT/Cursor drive Google and Meta ad campaigns end to end. None of these are model launches — but together they signal MCP graduating from protocol curiosity to the integration layer enterprises actually pay for.",
    sources: [
      {
        title: "Adobe Unveils CX Enterprise Coworker for Customer Experience Orchestration",
        url: "https://news.adobe.com/news/2026/04/adobe-unveils-cx-enterprise-coworker",
        source: "Adobe",
      },
      {
        title: "Expanding Agent Governance with Unity AI Gateway",
        url: "https://www.databricks.com/blog/ai-gateway-governance-layer-agentic-ai",
        source: "Databricks",
      },
      {
        title: "AdKit Launches MCP Service to Let AI Agents Manage Google and Meta Ad Campaigns",
        url: "https://www.newsfilecorp.com/release/295175/AdKit-Launches-MCP-Service-to-Let-AI-Agents-Manage-Google-and-Meta-Ad-Campaigns",
        source: "Newsfile",
      },
    ],
    auto: true,
  },
  {
    date: "2026-04-30",
    headline: "Hyperscalers lock in the compute decade.",
    body:
      "Anthropic landed two enormous compute commitments in ten days: an Apr 20 expansion with Amazon for up to 5 gigawatts, then an Apr 24 deal with Google worth up to $40 billion ($10B in cash now at a $350B valuation, $30B contingent on milestones, plus 5 GW of Google Cloud capacity over five years). The bilateral deals sit on top of a hyperscaler capex picture that crossed into surreal territory this earnings cycle — Microsoft, Alphabet, Meta, Amazon, and Oracle now project a combined ~$720B in 2026 capex, with Microsoft's CFO openly attributing $25B of its $190B alone to memory and component price inflation. Alphabet's stock had its best month since 2004 on the back of it.",
    sources: [
      {
        title: "Google to invest up to $40B in Anthropic in cash and compute",
        url: "https://techcrunch.com/2026/04/24/google-to-invest-up-to-40b-in-anthropic-in-cash-and-compute/",
        source: "TechCrunch",
      },
      {
        title: "Anthropic and Amazon expand compute partnership",
        url: "https://www.anthropic.com/news/anthropic-amazon-compute",
        source: "Anthropic",
      },
      {
        title: "Alphabet's best month since 2004 as AI capex spend mounts",
        url: "https://www.cnbc.com/2026/04/30/alphabet-meta-stock-ai-capex-spend.html",
        source: "CNBC",
      },
      {
        title: "Big Tech's AI spending plans reach $725 billion",
        url: "https://www.tomshardware.com/tech-industry/big-tech/big-techs-ai-spending-plans-reach-725-billion",
        source: "Tom's Hardware",
      },
    ],
    auto: true,
  },
  {
    date: "2026-04-28",
    headline: "EU AI Act omnibus stalls in trilogue.",
    body:
      "Negotiations over the EU's AI Act omnibus reform package broke down in trilogue on Apr 28, with a follow-up scheduled for mid-May. The package would push high-risk Annex III deadlines to Dec 2, 2027 and embedded-AI deadlines (medical devices, machinery, toys, connected cars) to Aug 2, 2028 — but Parliament has been pushing for sectoral carve-outs that the Council and Commission see as deregulatory rather than simplifying. Until something passes, the original Aug 2, 2026 enforcement deadline for high-risk systems still stands on paper.",
    sources: [
      {
        title: "AI Act Omnibus: What just happened and what comes next?",
        url: "https://iapp.org/news/a/ai-act-omnibus-what-just-happened-and-what-comes-next",
        source: "IAPP",
      },
    ],
    auto: true,
  },
  {
    date: "2026-04-24",
    headline: "DeepSeek V4 narrows the open-weights gap.",
    body:
      "DeepSeek released V4-Pro and V4-Flash on Apr 23, with V4-Pro overtaking Moonshot's Kimi K2.6 (1.1T) and Z.ai's GLM-5.1 (744B) as the largest open-weight model shipped to date. Press coverage called it the most consequential Chinese release since the original DeepSeek shock a year ago; Simon Willison's writeup characterized V4-Pro as \"almost on the frontier, a fraction of the price.\" V4 lands on top of an already-busy month for open weights — Gemma 4 (Apache 2.0, on-device sizes), Qwen3.6, and MiniMax M2.7 all trended on Hugging Face — making the proprietary-vs-open gap the smallest it has been on real-world tasks.",
    sources: [
      {
        title: "DeepSeek releases preview of long-awaited V4 model as AI race intensifies",
        url: "https://www.cnbc.com/2026/04/24/deepseek-v4-llm-preview-open-source-ai-competition-china.html",
        source: "CNBC",
      },
      {
        title: "DeepSeek Unveils Newest Flagship a Year After AI Breakthrough",
        url: "https://www.bloomberg.com/news/articles/2026-04-24/deepseek-unveils-newest-flagship-a-year-after-ai-breakthrough",
        source: "Bloomberg",
      },
      {
        title: "Welcome Gemma 4: Frontier multimodal intelligence on device",
        url: "https://huggingface.co/blog/gemma4",
        source: "Hugging Face",
      },
    ],
    auto: true,
  },
  {
    date: "2026-04-23",
    headline: "Frontier crossover: Claude Opus 4.7 and GPT-5.5 trade rounds.",
    body:
      "Anthropic shipped Claude Opus 4.7 on Apr 16 — same $5/$25-per-million pricing as 4.6, available across the API, Bedrock, Vertex, and Microsoft Foundry — pitching it as a long-running-agent and coding model with a 13% lift on a 93-task internal coding benchmark and 90.9% on BigLaw Bench. A week later OpenAI countered with GPT-5.5 (codename \"Spud\"), claiming Terminal-Bench 2.0 of 82.7% and FrontierMath 1–3 at 51.7%, rolled to ChatGPT Plus/Pro/Business/Enterprise and Codex first, with API access following a day later behind separate safeguards. Each lab's own benchmarks favor itself, so the more telling signal is that they are being shipped a week apart at all.",
    sources: [
      {
        title: "Claude Opus 4.7",
        url: "https://www.anthropic.com/news/claude-opus-4-7",
        source: "Anthropic",
      },
      {
        title: "Introducing GPT-5.5",
        url: "https://openai.com/index/introducing-gpt-5-5/",
        source: "OpenAI",
      },
      {
        title: "OpenAI releases GPT-5.5, bringing company one step closer to an AI 'super app'",
        url: "https://techcrunch.com/2026/04/23/openai-chatgpt-gpt-5-5-ai-model-superapp/",
        source: "TechCrunch",
      },
    ],
    auto: true,
  },
  {
    date: "2026-04-21",
    headline: "Agents step out of chat.",
    body:
      "Two of the biggest labs shipped product surfaces this cycle that aren't chat windows. Anthropic's Claude Design (Apr 17) is a collaboration tool aimed at designs, prototypes, slides, and visual artifacts rather than turn-by-turn dialogue. Google's Deep Research Max (Apr 21) is a multi-step research agent built on Gemini 3.1 Pro that pulls private data via MCP, accepts PDFs/CSVs/audio/video as input, and natively renders charts and infographics inline — with users able to review and edit the agent's plan before it runs. Both bets argue that for serious work, the chat transcript is the wrong primary interface.",
    sources: [
      {
        title: "Claude Design by Anthropic Labs",
        url: "https://www.anthropic.com/news/claude-design-anthropic-labs",
        source: "Anthropic",
      },
      {
        title: "Deep Research Max: a step change for autonomous research agents",
        url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/next-generation-gemini-deep-research/",
        source: "Google",
      },
    ],
    auto: true,
  },
  {
    date: "2026-04-15",
    headline: "Building effective agents.",
    body:
      "Anthropic's playbook for production agents: when to reach for workflows vs autonomous agents, common patterns (router, parallelizer, evaluator-optimizer), and how to keep agents debuggable rather than mystical.",
    sources: [
      {
        title: "Building effective agents",
        url: "https://www.anthropic.com/research/building-effective-agents",
        source: "Anthropic",
      },
    ],
  },
  {
    date: "2026-03-12",
    headline: "Contextual Retrieval.",
    body:
      "A technique for boosting RAG by prepending a short, document-aware context preamble to each chunk before embedding. Cheap to implement and meaningfully cuts retrieval failures on long documents.",
    sources: [
      {
        title: "Contextual Retrieval",
        url: "https://www.anthropic.com/news/contextual-retrieval",
        source: "Anthropic",
      },
    ],
  },
];
