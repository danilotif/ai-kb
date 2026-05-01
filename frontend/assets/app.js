(function () {
  "use strict";

  const VALID_VIEWS = new Set(["news", "resources"]);

  function viewFromHash() {
    const first = location.hash.replace(/^#/, "").split("/")[0];
    return VALID_VIEWS.has(first) ? first : "news";
  }

  function setView(name) {
    document.querySelectorAll(".nav-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.view === name);
    });
    document.querySelectorAll(".view").forEach((v) => {
      v.classList.toggle("hidden", v.dataset.view !== name);
    });
    document.body.classList.toggle("view-resources", name === "resources");
  }

  function applyHash() {
    const view = viewFromHash();
    setView(view);
    if (view === "resources") {
      window.App.resources.selectByHash();
    }
  }

  function bindNav() {
    document.getElementById("nav").addEventListener("click", (e) => {
      const btn = e.target.closest(".nav-tab");
      if (!btn) return;
      const target = btn.dataset.view;
      const newUrl = target === "news" ? location.pathname : "#" + target;
      history.pushState(null, "", newUrl);
      applyHash();
    });
    window.addEventListener("popstate", applyHash);
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.App.resources.render();
    window.App.briefing.render();
    bindNav();
    applyHash();
  });
})();
