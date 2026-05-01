(function () {
  "use strict";

  function setView(name) {
    document.querySelectorAll(".nav-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.view === name);
    });
    document.querySelectorAll(".view").forEach((v) => {
      v.classList.toggle("hidden", v.dataset.view !== name);
    });
    if (location.hash.replace("#", "") !== name) {
      history.replaceState(null, "", name === "news" ? location.pathname : "#" + name);
    }
  }

  function bindNav() {
    const nav = document.getElementById("nav");
    nav.addEventListener("click", (e) => {
      const btn = e.target.closest(".nav-tab");
      if (!btn) return;
      setView(btn.dataset.view);
    });
    window.addEventListener("popstate", () => {
      const h = location.hash.replace("#", "");
      setView(h === "topics" ? "topics" : "news");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.App.topics.render();
    window.App.briefing.render();
    bindNav();
    const initial = location.hash.replace("#", "");
    setView(initial === "topics" ? "topics" : "news");
  });
})();
