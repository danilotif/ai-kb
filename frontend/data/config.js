// Domain-specific settings for this dashboard. Edit this file when forking
// the template for a new domain (marketing, games, finance, etc.).
//
// The frontend reads window.CONFIG on load to populate the page title, tab
// labels, section headings, and footer. Nothing else is domain-specific in
// the frontend — categories are auto-discovered from resources/, and the
// briefing data comes from data/news.js (rewritten by your slash command).

window.CONFIG = {
  siteName: "AI Program",
  pageTitle: "AI Program — Personal Dashboard",
  tabs: {
    news: { label: "News", heading: "AI Briefing" },
    resources: { label: "Knowledge Base", heading: "Knowledge Base" },
  },
  footerHtml:
    'Static dashboard · edit knowledge base in <code>resources/</code> ' +
    '(then run <code>python3 frontend/scripts/build-resources.py</code>) ' +
    'and news in <code>frontend/data/news.js</code>',
};
