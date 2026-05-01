// AI news briefing. Edit by hand or refresh via `/update-news`.
// `/update-news` extends overlapping stories rather than replacing them — every story is durable.
// Schema: { date (YYYY-MM-DD), headline, body, sources: [{ title, url, source }], note? }

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
  },
  {
    date: "2026-04-30",
    headline: "Anthropic eyes $900B, surpasses OpenAI on revenue.",
    body:
      "Anthropic is entertaining offers that would value it above $900 billion — potentially making it the world's most valuable AI startup, ahead of OpenAI — per an Apr 29 Bloomberg report; TechCrunch put the prospective round at roughly $50 billion. The talks land days after Google committed to invest up to $40 billion (Apr 24, with $10B in cash now and up to $30B contingent on milestones), and on Apr 30 The Register reported that Anthropic's run-rate revenue had crossed ~$30B versus OpenAI's ~$25B — a flip from the same time last year. The company says any deal is at an early stage and no offer has been accepted.",
    sources: [
      {
        title: "Anthropic Considering Funding Offers at Over $900 Billion Value",
        url: "https://www.bloomberg.com/news/articles/2026-04-29/anthropic-considering-funding-offers-at-over-900-billion-value",
        source: "Bloomberg",
      },
      {
        title: "Sources: Anthropic could raise a new $50B round at a valuation of $900B",
        url: "https://techcrunch.com/2026/04/29/sources-anthropic-could-raise-a-new-50b-round-at-a-valuation-of-900b/",
        source: "TechCrunch",
      },
      {
        title: "Anthropic tops OpenAI in LLM revenue stakes",
        url: "https://www.theregister.com/2026/04/30/openai_anthropic_top_lines_research_counterpoint",
        source: "The Register",
      },
      {
        title: "Google to invest up to $40 billion in Anthropic as search giant spreads its AI bets",
        url: "https://www.cnbc.com/2026/04/24/google-to-invest-up-to-40-billion-in-anthropic-as-search-giant-spreads-its-ai-bets.html",
        source: "CNBC",
      },
    ],
  },
  {
    date: "2026-04-30",
    headline: "Hyperscalers lock in the compute decade; Nvidia takes a hit.",
    body:
      "Anthropic landed two enormous compute commitments in ten days — an Apr 20 expansion with Amazon for up to 5 gigawatts and an Apr 24 deal with Google worth up to $40 billion ($10B in cash now, $30B contingent, plus 5 GW of Google Cloud capacity over five years) — sitting on top of a Mag 7 capex picture that closed Q1 earnings around $720–725 billion for 2026 (Amazon ~$200B, Google ~$185B, Microsoft ~$140B, Meta $125–145B). Microsoft's CFO openly attributed $25B of its $190B to memory and component price inflation. Alphabet's stock had its best month since 2004; Nvidia, by contrast, fell sharply into the print as analysts flagged hyperscaler custom silicon (TPU, Trainium, MTIA, Maia) as a 'significant risk' to GPU dominance and Sherwood reported the marginal bottleneck has shifted from GPUs to memory and other hardware.",
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
      {
        title: "'Magnificent 7' earnings rush reveals AI spending surge, with hyperscaler capex set to reach $725 billion in 2026",
        url: "https://finance.yahoo.com/markets/article/magnificent-7-earnings-rush-reveals-ai-spending-surge-with-hyperscaler-capex-set-to-reach-725-billion-in-2026-224901707.html",
        source: "Yahoo Finance",
      },
      {
        title: "Wall Street Analyst Warns Hyperscaler Custom Chips Pose 'Significant Risk' to NVIDIA's Dominance",
        url: "https://247wallst.com/investing/2026/04/30/wall-street-analyst-warns-hyperscaler-custom-chips-pose-significant-risk-to-nvidias-dominance/",
        source: "24/7 Wall St",
      },
      {
        title: "Nvidia tumbles after hyperscaler earnings, with GPUs no longer the missing ingredient in the AI boom",
        url: "https://sherwood.news/markets/nvidia-falls-hyperscaler-earnings-gpus-other-hardware-memory-chips-ai-boom/",
        source: "Sherwood News",
      },
    ],
  },
  {
    date: "2026-04-30",
    headline: "Tech layoffs surge; AI cited for nearly half.",
    body:
      "April brought roughly 40,000 announced tech-sector cuts, on top of ~80,000 in Q1, with industry trackers attributing nearly half of those positions to AI and workflow automation. Meta said it would lay off ~8,000 (10% of staff) starting May 20 and scrap 6,000 open roles; Oracle's restructuring is reported to hit up to 30,000; Snap is shedding ~16% (~1,000). Sam Altman publicly pushed back on the framing, arguing that some of what's being labeled AI displacement is 'AI washing' for cost-cutting that would have happened anyway — though even he conceded real displacement is also underway.",
    sources: [
      {
        title: "Tech layoffs 2026: Nearly 40,000 jobs lost in April amid changing AI priorities",
        url: "https://www.businesstoday.in/technology/story/tech-layoffs-2026-nearly-40000-jobs-lost-in-april-amid-changing-ai-priorities-528282-2026-04-30",
        source: "Business Today",
      },
      {
        title: "20,000 job cuts at Meta, Microsoft raise concern that AI-driven labor crisis is here",
        url: "https://www.cnbc.com/2026/04/24/20k-job-cuts-at-meta-microsoft-raise-concern-of-ai-labor-crisis-.html",
        source: "CNBC",
      },
      {
        title: "Tech industry lays off nearly 80,000 employees in the first quarter of 2026",
        url: "https://www.tomshardware.com/tech-industry/tech-industry-lays-off-nearly-80-000-employees-in-the-first-quarter-of-2026-almost-50-percent-of-affected-positions-cut-due-to-ai",
        source: "Tom's Hardware",
      },
    ],
  },
  {
    date: "2026-04-30",
    headline: "Agents step out of chat.",
    body:
      "Three of the biggest labs shipped product surfaces this cycle that aren't chat windows. Anthropic's Claude Design (Apr 17) is a collaboration tool aimed at designs, prototypes, slides, and visual artifacts rather than turn-by-turn dialogue. Google's Deep Research Max (Apr 21) is a multi-step research agent on Gemini 3.1 Pro that pulls private data via MCP, ingests PDFs/CSVs/audio/video, and renders charts and infographics inline — with users editing the agent's plan before it runs. On Apr 30 Google began rolling Gemini out to vehicles with Google built-in, replacing Google Assistant for in-car voice — the first mass-market consumer surface where Gemini is the default agent. The common bet: chat isn't the right interface for either serious work or ambient compute.",
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
      {
        title: "Google's Gemini AI assistant is hitting the road in millions of vehicles",
        url: "https://techcrunch.com/2026/04/30/googles-gemini-ai-assistant-is-hitting-the-road-in-millions-of-vehicles/",
        source: "TechCrunch",
      },
    ],
  },
  {
    date: "2026-04-28",
    headline: "EU AI Act omnibus stalls in trilogue.",
    body:
      "Trilogue negotiations on the EU's AI Act omnibus reform broke down on Apr 28 after 12 hours of talks; follow-up scheduled for May. The package would push high-risk Annex III deadlines to Dec 2, 2027 and embedded-AI deadlines (medical devices, machinery, toys, connected cars) to Aug 2, 2028 — but Parliament wants sectoral carve-outs the Council and Commission view as deregulatory rather than simplifying. Until a deal lands, the original Aug 2, 2026 enforcement deadline for high-risk systems still applies on paper.",
    sources: [
      {
        title: "AI Act Omnibus: What just happened and what comes next?",
        url: "https://iapp.org/news/a/ai-act-omnibus-what-just-happened-and-what-comes-next",
        source: "IAPP",
      },
      {
        title: "EU AI Act reform talks stall as key compliance deadline looms",
        url: "https://iapp.org/news/a/eu-ai-act-reform-talks-stall-as-key-compliance-deadline-looms",
        source: "IAPP",
      },
    ],
  },
  {
    date: "2026-04-27",
    headline: "Frontier crossover meets cloud unlock.",
    body:
      "Anthropic shipped Claude Opus 4.7 on Apr 16 — same $5/$25-per-million pricing as 4.6, available across the API, Bedrock, Vertex, and Microsoft Foundry — pitched as a long-running-agent and coding model with a 13% lift on a 93-task internal coding benchmark and 90.9% on BigLaw Bench. A week later OpenAI countered with GPT-5.5 (codename 'Spud') on Apr 23, claiming Terminal-Bench 2.0 of 82.7% and FrontierMath 1–3 at 51.7%, rolling first to ChatGPT Plus/Pro/Business/Enterprise and Codex with API a day later. Then on Apr 27 Microsoft and OpenAI amended their partnership: Azure remains primary cloud but exclusivity is gone, OpenAI can serve any cloud, the IP license through 2032 is now non-exclusive, the AGI carve-out is removed, and OpenAI's revenue share to Microsoft is capped through 2030 — making GPT-5.5 the last OpenAI model whose distribution was structurally tied to Azure.",
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
        title: "OpenAI announces GPT-5.5, its latest artificial intelligence model",
        url: "https://www.cnbc.com/2026/04/23/openai-announces-latest-artificial-intelligence-model.html",
        source: "CNBC",
      },
      {
        title: "The next phase of the Microsoft-OpenAI partnership",
        url: "https://blogs.microsoft.com/blog/2026/04/27/the-next-phase-of-the-microsoft-openai-partnership/",
        source: "Microsoft",
      },
      {
        title: "OpenAI shakes up partnership with Microsoft, capping revenue share payments",
        url: "https://www.cnbc.com/2026/04/27/openai-microsoft-partnership-revenue-cap.html",
        source: "CNBC",
      },
      {
        title: "OpenAI ends Microsoft legal peril over its $50B Amazon deal",
        url: "https://techcrunch.com/2026/04/27/openai-ends-microsoft-legal-peril-over-its-50b-amazon-deal/",
        source: "TechCrunch",
      },
    ],
  },
  {
    date: "2026-04-24",
    headline: "Open-weights wave: DeepSeek V4 leads, Kimi K2.6 close behind.",
    body:
      "DeepSeek shipped V4 on Apr 23–24 in two MoE variants — V4-Pro at 1.6T params (49B active), overtaking Moonshot's Kimi K2.6 (1.1T) and Z.ai's GLM-5.1 (744B) as the largest open-weight model shipped to date, and V4-Flash at 284B (13B active) — both with 1M-token context. Per DeepSeek's own benchmarks V4-Pro hits 80.6% on SWE-Bench Verified (within a fraction of Claude Opus 4.6) and a Codeforces rating of 3,206; Simon Willison characterized V4-Pro as 'almost on the frontier, a fraction of the price.' Apr 20 saw Moonshot ship Kimi K2.6 — a 1T-param MoE (32B active) priced at $0.60/$2.50 per million tokens, with Moonshot's own evals claiming a tie with GPT-5.5 on SWE-Bench Pro and a long-horizon agent variant scaling to 300 sub-agents. Gemma 4 (Apache 2.0, on-device sizes), Qwen3.6, and MiniMax M2.7 also trended on Hugging Face. Vendor benchmarks favor each model — but the cost-per-capability gap with proprietary frontier is the smallest it has been on real-world coding tasks.",
    sources: [
      {
        title: "China's DeepSeek releases preview of long-awaited V4 model as AI race intensifies",
        url: "https://www.cnbc.com/2026/04/24/deepseek-v4-llm-preview-open-source-ai-competition-china.html",
        source: "CNBC",
      },
      {
        title: "DeepSeek Unveils Newest Flagship a Year After AI Breakthrough",
        url: "https://www.bloomberg.com/news/articles/2026-04-24/deepseek-unveils-newest-flagship-a-year-after-ai-breakthrough",
        source: "Bloomberg",
      },
      {
        title: "DeepSeek V4 Preview Release",
        url: "https://api-docs.deepseek.com/news/news260424",
        source: "DeepSeek",
      },
      {
        title: "Moonshot AI Releases Kimi K2.6 with Long-Horizon Coding, Agent Swarm Scaling to 300 Sub-Agents and 4,000 Coordinated Steps",
        url: "https://www.marktechpost.com/2026/04/20/moonshot-ai-releases-kimi-k2-6-with-long-horizon-coding-agent-swarm-scaling-to-300-sub-agents-and-4000-coordinated-steps/",
        source: "MarkTechPost",
      },
      {
        title: "Welcome Gemma 4: Frontier multimodal intelligence on device",
        url: "https://huggingface.co/blog/gemma4",
        source: "Hugging Face",
      },
    ],
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
