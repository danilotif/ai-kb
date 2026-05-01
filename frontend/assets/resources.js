(function () {
  "use strict";
  const { el } = window.App;
  const data = window.RESOURCES || { categories: [] };

  let currentPath = null;
  const expanded = new Set(["resources"]);

  // ---------- markdown rendering ----------

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
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
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

  // ---------- icons ----------

  const ICON_FOLDER =
    '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 3.75A1.25 1.25 0 012.75 2.5h3.382a1.25 1.25 0 01.884.366L8.5 4.25h4.75A1.25 1.25 0 0114.5 5.5v6.75a1.25 1.25 0 01-1.25 1.25H2.75A1.25 1.25 0 011.5 12.25V3.75z"/></svg>';
  const ICON_FILE =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"><path d="M9.5 1.75H4a1.25 1.25 0 00-1.25 1.25v10a1.25 1.25 0 001.25 1.25h8A1.25 1.25 0 0013.25 13V5.5l-3.75-3.75z"/><path d="M9.5 1.75V5.5h3.75"/></svg>';
  const ICON_CHEVRON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l4 4-4 4"/></svg>';

  function glyph(html, cls) {
    const s = document.createElement("span");
    s.className = cls;
    s.innerHTML = html;
    return s;
  }

  // ---------- lookup ----------

  function findFile(path) {
    for (const c of data.categories) {
      for (const f of c.files) {
        if (f.path === path) return { category: c, file: f };
      }
    }
    return null;
  }

  function firstPath() {
    for (const c of data.categories) {
      if (c.files.length) return c.files[0].path;
    }
    return null;
  }

  function ensureCurrentExpanded() {
    expanded.add("resources");
    if (currentPath) {
      const parts = currentPath.split("/");
      // path = <category>/<kind>/<file.md>
      if (parts.length >= 1) expanded.add("resources/" + parts[0]);
      if (parts.length >= 2) expanded.add("resources/" + parts[0] + "/" + parts[1]);
    }
  }

  const KIND_ORDER = ["theory", "practice"];

  function groupByKind(files) {
    const groups = {};
    for (const f of files) {
      const k = f.kind || "theory";
      (groups[k] = groups[k] || []).push(f);
    }
    return groups;
  }

  // ---------- sidebar ----------

  function fileRow(f) {
    return el(
      "a",
      {
        class: "tree-row tree-file" + (currentPath === f.path ? " active" : ""),
        href: "#resources/" + f.path.replace(/\.md$/, ""),
        "data-path": f.path,
      },
      [
        glyph("", "tree-chev tree-chev-spacer"),
        glyph(ICON_FILE, "tree-icon tree-icon-file"),
        el("span", { class: "tree-label" }, f.slug),
      ]
    );
  }

  function folderRow(key, label, isOpen) {
    return el(
      "button",
      {
        class: "tree-row tree-folder-row",
        type: "button",
        "data-toggle": key,
      },
      [
        glyph(ICON_CHEVRON, "tree-chev" + (isOpen ? " open" : "")),
        glyph(ICON_FOLDER, "tree-icon tree-icon-folder"),
        el("span", { class: "tree-label" }, label),
      ]
    );
  }

  function renderSidebar() {
    ensureCurrentExpanded();
    const tree = document.getElementById("resources-tree");
    tree.innerHTML = "";

    if (!data.categories.length) {
      tree.appendChild(
        el(
          "div",
          { class: "empty" },
          "No documents yet. Add markdown files to resources/ and run python3 scripts/build-resources.py."
        )
      );
      return;
    }

    const rootKey = "resources";
    const rootOpen = expanded.has(rootKey);

    const categoryNodes = data.categories.map((cat) => {
      const catKey = "resources/" + cat.slug;
      const catOpen = expanded.has(catKey);
      const catRow = folderRow(catKey, cat.slug, catOpen);
      let children = null;
      if (catOpen) {
        const groups = groupByKind(cat.files);
        const presentKinds = KIND_ORDER.filter((k) => groups[k] && groups[k].length);
        if (presentKinds.length <= 1) {
          // single-kind category: skip the kind wrapper for less clicking
          children = el("div", { class: "tree-children" }, cat.files.map(fileRow));
        } else {
          const kindNodes = presentKinds.map((k) => {
            const kindKey = catKey + "/" + k;
            const kindOpen = expanded.has(kindKey);
            const kindRow = folderRow(kindKey, k, kindOpen);
            const kindChildren = kindOpen
              ? el("div", { class: "tree-children" }, groups[k].map(fileRow))
              : null;
            return el(
              "div",
              { class: "tree-folder" + (kindOpen ? " open" : "") },
              kindChildren ? [kindRow, kindChildren] : [kindRow]
            );
          });
          children = el("div", { class: "tree-children" }, kindNodes);
        }
      }
      return el(
        "div",
        { class: "tree-folder" + (catOpen ? " open" : "") },
        children ? [catRow, children] : [catRow]
      );
    });

    const rootChildren = rootOpen
      ? el("div", { class: "tree-children" }, categoryNodes)
      : null;
    const rootRow = folderRow(rootKey, "resources", rootOpen);
    const rootNode = el(
      "div",
      { class: "tree-folder" + (rootOpen ? " open" : "") },
      rootChildren ? [rootRow, rootChildren] : [rootRow]
    );

    tree.appendChild(rootNode);

    const count = document.getElementById("resources-count");
    if (count) {
      const total = data.categories.reduce((n, c) => n + c.files.length, 0);
      count.textContent = `${total} file${total === 1 ? "" : "s"}`;
    }
  }

  // ---------- content ----------

  function renderContent() {
    const content = document.getElementById("resources-content");
    content.innerHTML = "";
    if (!currentPath) {
      content.appendChild(
        el("div", { class: "resources-placeholder" }, "Select a document from the sidebar.")
      );
      return;
    }
    const found = findFile(currentPath);
    if (!found) {
      content.appendChild(el("div", { class: "empty" }, "Not found."));
      return;
    }
    const meta = el("div", { class: "resource-meta" }, [
      el("span", { class: "resource-category" }, found.category.name),
      found.file.date_added
        ? el("span", { class: "resource-date" }, "added " + found.file.date_added)
        : null,
    ]);
    const article = el("article", { class: "resource-page" });
    article.innerHTML = renderMarkdown(found.file.content);
    content.appendChild(meta);
    content.appendChild(article);
    content.scrollTop = 0;
  }

  // ---------- routing + binding ----------

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
      currentPath = firstPath();
    }
    renderSidebar();
    renderContent();
  }

  function bind() {
    const tree = document.getElementById("resources-tree");
    tree.addEventListener("click", (e) => {
      const folderBtn = e.target.closest(".tree-folder-row");
      if (folderBtn) {
        e.preventDefault();
        const key = folderBtn.dataset.toggle;
        if (expanded.has(key)) expanded.delete(key);
        else expanded.add(key);
        renderSidebar();
        return;
      }
      const fileLink = e.target.closest("a.tree-file");
      if (fileLink) {
        e.preventDefault();
        currentPath = fileLink.dataset.path;
        history.pushState(null, "", "#resources/" + currentPath.replace(/\.md$/, ""));
        renderSidebar();
        renderContent();
      }
    });
  }

  function render() {
    bind();
    selectByHash();
  }

  window.App.resources = { render, selectByHash };
})();
