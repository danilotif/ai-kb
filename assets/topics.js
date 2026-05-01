(function () {
  "use strict";
  const { el } = window.App;

  const UNCATEGORIZED = "Uncategorized";

  const topics = (window.TOPICS || [])
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  function groupByCategory(list) {
    const groups = new Map();
    for (const t of list) {
      const key = t.category || UNCATEGORIZED;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(t);
    }
    return Array.from(groups.entries()).sort(([a], [b]) => {
      if (a === UNCATEGORIZED) return 1;
      if (b === UNCATEGORIZED) return -1;
      return a.localeCompare(b);
    });
  }

  function renderCard(t) {
    const parts = [
      el("div", { class: "card-head" }, [el("h3", { class: "card-title" }, t.name)]),
    ];

    if (t.description) parts.push(el("p", { class: "card-desc" }, t.description));

    if (t.tags && t.tags.length) {
      parts.push(
        el("div", { class: "tags" }, t.tags.map((tag) => el("span", { class: "tag" }, tag)))
      );
    }

    if (t.resources && t.resources.length) {
      parts.push(
        el(
          "ul",
          { class: "resources" },
          t.resources.map((r) =>
            el("li", {}, [
              el("a", { href: r.url, target: "_blank", rel: "noopener" }, r.title || r.url),
            ])
          )
        )
      );
    }

    if (t.date_added) {
      parts.push(el("div", { class: "card-foot" }, [el("span", {}, "added " + t.date_added)]));
    }

    return el("div", { class: "card" }, parts);
  }

  function render() {
    const container = document.getElementById("topics");
    container.innerHTML = "";

    if (topics.length === 0) {
      container.appendChild(el("div", { class: "empty" }, "No topics yet."));
      return;
    }

    groupByCategory(topics).forEach(([category, items]) => {
      const head = el("div", { class: "category-head" }, [
        el("h3", { class: "category-name" }, category),
        el("span", { class: "category-count" }, `${items.length}`),
      ]);

      const grid = el("div", { class: "grid" }, items.map(renderCard));

      container.appendChild(el("div", { class: "category-block" }, [head, grid]));
    });
  }

  window.App.topics = { render };
})();
