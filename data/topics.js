// Edit this list to track AI topics. Each topic must have a `category`.
// Status: "queued" | "studying" | "done".
// Schema: { id, name, category, description, status, tags[], resources[{title,url}], date_added }

window.TOPICS = [
  // Foundations
  {
    id: "transformers",
    name: "Transformers",
    category: "Foundations",
    description: "Self-attention, multi-head attention, encoder/decoder architecture.",
    status: "done",
    tags: ["paper", "architecture"],
    resources: [
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762" },
      { title: "The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/" },
    ],
    date_added: "2026-01-10",
  },
  {
    id: "tokenization",
    name: "Tokenization & BPE",
    category: "Foundations",
    description: "Byte-pair encoding, subword tokenizers, vocabulary construction.",
    status: "done",
    tags: ["nlp"],
    resources: [
      { title: "HF Tokenizers course", url: "https://huggingface.co/learn/nlp-course/chapter6" },
    ],
    date_added: "2026-01-15",
  },
  {
    id: "diffusion",
    name: "Diffusion models",
    category: "Foundations",
    description: "Denoising diffusion, score-based models, image generation.",
    status: "queued",
    tags: ["vision", "paper"],
    resources: [{ title: "DDPM paper", url: "https://arxiv.org/abs/2006.11239" }],
    date_added: "2026-04-25",
  },

  // Fine-tuning
  {
    id: "lora",
    name: "LoRA & PEFT",
    category: "Fine-tuning",
    description: "Low-rank adapters, parameter-efficient fine-tuning techniques.",
    status: "studying",
    tags: ["paper", "hands-on"],
    resources: [{ title: "LoRA paper", url: "https://arxiv.org/abs/2106.09685" }],
    date_added: "2026-04-02",
  },
  {
    id: "rlhf",
    name: "RLHF & DPO",
    category: "Fine-tuning",
    description: "Reward modeling, PPO for language models, direct preference optimization.",
    status: "queued",
    tags: ["alignment", "paper"],
    resources: [{ title: "DPO paper", url: "https://arxiv.org/abs/2305.18290" }],
    date_added: "2026-04-15",
  },

  // Retrieval
  {
    id: "rag",
    name: "Retrieval-Augmented Generation",
    category: "Retrieval",
    description: "Embeddings, vector stores, retrieval pipelines, reranking.",
    status: "studying",
    tags: ["applications"],
    resources: [
      { title: "Anthropic — Contextual Retrieval", url: "https://www.anthropic.com/news/contextual-retrieval" },
    ],
    date_added: "2026-03-20",
  },

  // Agents
  {
    id: "agents",
    name: "Agentic systems",
    category: "Agents",
    description: "Tool use, planning loops, multi-step reasoning, agent frameworks.",
    status: "queued",
    tags: ["applications"],
    resources: [
      { title: "Building effective agents", url: "https://www.anthropic.com/research/building-effective-agents" },
    ],
    date_added: "2026-04-20",
  },

  // MCP
  {
    id: "mcp-basics",
    name: "Model Context Protocol — basics",
    category: "MCP",
    description: "Spec overview, transports, primitives (tools/resources/prompts).",
    status: "studying",
    tags: ["protocol"],
    resources: [{ title: "MCP docs", url: "https://modelcontextprotocol.io" }],
    date_added: "2026-04-28",
  },
  {
    id: "mcp-servers",
    name: "Building MCP servers",
    category: "MCP",
    description: "SDK usage, tool design, auth flows, server lifecycle.",
    status: "queued",
    tags: ["hands-on"],
    resources: [],
    date_added: "2026-04-29",
  },

  // Local models
  {
    id: "ollama",
    name: "Ollama & local inference",
    category: "Local models",
    description: "Running open-weight models locally, model registry, GPU/CPU options.",
    status: "queued",
    tags: ["hands-on"],
    resources: [{ title: "Ollama", url: "https://ollama.com" }],
    date_added: "2026-04-25",
  },
  {
    id: "quantization",
    name: "Quantization (GGUF, GPTQ, AWQ)",
    category: "Local models",
    description: "Weight quantization formats and trade-offs for local inference.",
    status: "queued",
    tags: ["theory"],
    resources: [],
    date_added: "2026-04-26",
  },

  // New models
  {
    id: "claude-4x",
    name: "Claude 4.x family",
    category: "New models",
    description: "Opus 4.7, Sonnet 4.6, Haiku 4.5 — capabilities, context, pricing.",
    status: "studying",
    tags: ["frontier"],
    resources: [{ title: "Anthropic news", url: "https://www.anthropic.com/news" }],
    date_added: "2026-04-30",
  },
  {
    id: "frontier-evals",
    name: "Frontier model eval comparisons",
    category: "New models",
    description: "How current frontier models compare on reasoning, code, agentic tasks.",
    status: "queued",
    tags: ["evaluation"],
    resources: [],
    date_added: "2026-04-30",
  },

  // Evaluation
  {
    id: "evals-design",
    name: "Designing reliable evals",
    category: "Evaluation",
    description: "Common pitfalls, eval-driven development, golden sets vs. LLM-as-judge.",
    status: "queued",
    tags: ["practice"],
    resources: [],
    date_added: "2026-04-22",
  },

  // Tips & tricks
  {
    id: "prompt-patterns",
    name: "Prompt engineering patterns",
    category: "Tips & tricks",
    description: "Few-shot, chain-of-thought, tool-use templates, structured output.",
    status: "done",
    tags: ["practice"],
    resources: [],
    date_added: "2026-02-12",
  },
  {
    id: "caching-cost",
    name: "Caching & cost optimization",
    category: "Tips & tricks",
    description: "Prompt caching, cache hit rates, system-prompt placement.",
    status: "studying",
    tags: ["practice"],
    resources: [
      { title: "Anthropic — Prompt caching", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching" },
    ],
    date_added: "2026-04-18",
  },
];
