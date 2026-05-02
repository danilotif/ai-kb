(function () {
  "use strict";
  const { el } = window.App;

  const stories = (window.NEWS || [])
    .slice()
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  // Bridges old flat-link entries ({title,url,source}) to the story schema
  // so a stale data file still renders without errors.
  function normalizeSources(n) {
    if (Array.isArray(n.sources) && n.sources.length) return n.sources;
    if (n.url) {
      return [{ title: n.title || n.headline || n.url, url: n.url, source: n.source || "" }];
    }
    return [];
  }

  function renderStory(n) {
    const headline = n.headline || n.title || "";
    const body = n.body || n.summary || "";
    const sources = normalizeSources(n);

    const parts = [];
    if (n.date) parts.push(el("div", { class: "story-date" }, n.date));
    parts.push(el("h2", { class: "story-title" }, headline));
    if (body) parts.push(el("p", { class: "story-body" }, body));

    if (sources.length) {
      parts.push(
        el(
          "ol",
          { class: "story-refs-list" },
          sources.map((s) =>
            el("li", { class: "story-ref" }, [
              el(
                "a",
                { href: s.url, target: "_blank", rel: "noopener", title: s.title || s.url },
                [
                  el("span", { class: "ref-title" }, s.title || s.url),
                  el("span", { class: "ref-source" }, s.source || ""),
                ]
              ),
            ])
          )
        )
      );
    }

    if (n.note) parts.push(el("div", { class: "story-note" }, n.note));

    return el("article", { class: "story" }, parts);
  }

  function render() {
    const list = document.getElementById("news");
    list.innerHTML = "";

    if (stories.length === 0) {
      list.appendChild(
        el("div", { class: "empty" }, "No briefings yet — add stories to data/news.js or run /update-news.")
      );
      return;
    }

    stories.forEach((n) => list.appendChild(renderStory(n)));
  }

  window.App.briefing = { render };
})();
