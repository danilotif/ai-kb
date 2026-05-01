(function () {
  "use strict";
  const { el } = window.App;
  const data = window.RESOURCES || { themes: [] };

  let currentPath = null;

  function escapeHtml(s) {
    return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  function inline(s) {
    s = escapeHtml(s);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return s;
  }

  function renderMarkdown(md) {
    const lines = md.split("\n");
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("# ")) {
        out.push(`<h1>${inline(line.slice(2))}</h1>`);
        i++;
      } else if (line.startsWith("## ")) {
        out.push(`<h2>${inline(line.slice(3))}</h2>`);
        i++;
      } else if (line.startsWith("- ")) {
        const items = [];
        while (i < lines.length && lines[i].startsWith("- ")) {
          items.push(`<li>${inline(lines[i].slice(2))}</li>`);
          i++;
        }
        out.push(`<ul>${items.join("")}</ul>`);
      } else if (line.trim() === "") {
        i++;
      } else {
        const para = [];
        while (
          i < lines.length &&
          lines[i].trim() !== "" &&
          !lines[i].startsWith("#") &&
          !lines[i].startsWith("- ")
        ) {
          para.push(lines[i]);
          i++;
        }
        out.push(`<p>${inline(para.join(" "))}</p>`);
      }
    }
    return out.join("\n");
  }

  function findFile(path) {
    for (const t of data.themes) {
      for (const f of t.files) {
        if (f.path === path) return { theme: t, file: f };
      }
    }
    return null;
  }

  function newestPath() {
    let best = null;
    for (const t of data.themes) {
      for (const f of t.files) {
        if (!best || (f.date || "") > (best.date || "")) best = f;
      }
    }
    return best ? best.path : null;
  }

  function renderSidebar() {
    const tree = document.getElementById("resources-tree");
    tree.innerHTML = "";
    if (!data.themes.length) {
      tree.appendChild(
        el(
          "div",
          { class: "empty" },
          "No resources yet. Run python3 scripts/build-resources.py."
        )
      );
      return;
    }
    data.themes.forEach((theme) => {
      const items = theme.files.map((f) =>
        el("li", {}, [
          el(
            "a",
            {
              class: "tree-file" + (currentPath === f.path ? " active" : ""),
              href: "#resources/" + f.path.replace(/\.md$/, ""),
              "data-path": f.path,
            },
            [
              el("span", { class: "tree-file-title" }, f.title),
              el("span", { class: "tree-file-date" }, f.date || ""),
            ]
          ),
        ])
      );
      tree.appendChild(
        el("div", { class: "tree-theme" }, [
          el("div", { class: "tree-theme-name" }, [
            el("span", {}, theme.name),
            el("span", { class: "tree-theme-count" }, String(theme.files.length)),
          ]),
          el("ul", { class: "tree-files" }, items),
        ])
      );
    });
  }

  function renderContent() {
    const content = document.getElementById("resources-content");
    content.innerHTML = "";
    if (!currentPath) {
      content.appendChild(
        el("div", { class: "resources-placeholder" }, "Select a story from the sidebar.")
      );
      return;
    }
    const found = findFile(currentPath);
    if (!found) {
      content.appendChild(el("div", { class: "empty" }, "Not found."));
      return;
    }
    const meta = el("div", { class: "resource-meta" }, [
      el("span", { class: "resource-theme" }, found.theme.name),
      el("span", { class: "resource-date" }, found.file.date || ""),
      found.file.auto ? el("span", { class: "resource-auto" }, "auto") : null,
    ]);
    const article = el("article", { class: "resource-page" });
    article.innerHTML = renderMarkdown(found.file.content);
    content.appendChild(meta);
    content.appendChild(article);
    content.scrollTop = 0;
  }

  function pathFromHash() {
    const h = location.hash.replace(/^#/, "");
    if (!h.startsWith("resources/")) return null;
    return h.slice("resources/".length) + ".md";
  }

  function selectByHash() {
    const target = pathFromHash();
    if (target && findFile(target)) {
      currentPath = target;
    } else if (!currentPath) {
      currentPath = newestPath();
    }
    renderSidebar();
    renderContent();
  }

  function bind() {
    document.getElementById("resources-tree").addEventListener("click", (e) => {
      const a = e.target.closest("a.tree-file");
      if (!a) return;
      e.preventDefault();
      currentPath = a.dataset.path;
      history.pushState(null, "", "#resources/" + currentPath.replace(/\.md$/, ""));
      renderSidebar();
      renderContent();
    });
  }

  function render() {
    bind();
    selectByHash();
  }

  window.App.resources = { render, selectByHash };
})();
