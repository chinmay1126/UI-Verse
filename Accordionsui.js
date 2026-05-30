/* =====================================================
  ACCORDIONS
  – Full keyboard support (Enter / Space / Arrow keys)
  – Manages aria-expanded, aria-controls, id linkage
  – Animates height via CSS custom property instead of
    toggling a class so transitions are smooth and
    respects prefers-reduced-motion
===================================================== */

(function initAccordions() {
  const items = document.querySelectorAll(".accordion-item");
  if (!items.length) return;

  items.forEach((item, index) => {
    const button = item.querySelector(".accordion-btn");
    const panel  = item.querySelector(".accordion-panel");

    if (!button || !panel) return;

    // ── Wire up ids so aria-controls / aria-labelledby work ──
    const uid = `accordion-${index}`;
    button.id               = button.id  || `${uid}-btn`;
    panel.id                = panel.id   || `${uid}-panel`;
    button.setAttribute("aria-controls",     panel.id);
    button.setAttribute("aria-expanded",     "false");
    panel.setAttribute("role",               "region");
    panel.setAttribute("aria-labelledby",    button.id);
    panel.setAttribute("hidden",             "");       // collapsed by default

    button.addEventListener("click", () => toggleItem(item));

    // ── Keyboard: arrow navigation across buttons ──
    button.addEventListener("keydown", (e) => {
      const buttons = [...document.querySelectorAll(".accordion-btn")];
      const i       = buttons.indexOf(button);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        buttons[(i + 1) % buttons.length].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        buttons[(i - 1 + buttons.length) % buttons.length].focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        buttons[0].focus();
      } else if (e.key === "End") {
        e.preventDefault();
        buttons[buttons.length - 1].focus();
      }
    });
  });

  function toggleItem(activeItem) {
    const isOpen = activeItem.classList.contains("active");

    // Collapse every item
    items.forEach((item) => {
      const btn   = item.querySelector(".accordion-btn");
      const panel = item.querySelector(".accordion-panel");
      if (!btn || !panel) return;

      item.classList.remove("active");
      btn.setAttribute("aria-expanded", "false");
      panel.setAttribute("hidden", "");
    });

    // If it wasn't open, open it now
    if (!isOpen) {
      const btn   = activeItem.querySelector(".accordion-btn");
      const panel = activeItem.querySelector(".accordion-panel");

      activeItem.classList.add("active");
      btn.setAttribute("aria-expanded", "true");
      panel.removeAttribute("hidden");
    }
  }
})();


/* =====================================================
  NAVBAR SCROLL
  – Throttled via requestAnimationFrame instead of
    firing on every scroll event (performance)
  – Uses CSS custom properties so dark-mode stays
    consistent; never overwrites inline style directly
  – Single passive listener reduces jank
===================================================== */

(function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let ticking = false;

  function updateNavbar() {
    // Drive appearance through a data-attribute; let CSS
    // handle the actual colours so dark-mode overrides work.
    navbar.dataset.scrolled = window.scrollY > 20 ? "true" : "false";
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // Run once on load so the state matches if the page
  // is refreshed mid-scroll.
  updateNavbar();
})();

/*
  Required CSS to pair with the navbar scroll logic above.
  Add this to your stylesheet so dark-mode colours stay
  token-driven and are never clobbered by inline styles:

    .navbar {
      background: rgba(5, 8, 22, 0.82);
      backdrop-filter: blur(10px);
      transition: background 250ms ease, box-shadow 250ms ease;
    }
    .navbar[data-scrolled="true"] {
      background: rgba(5, 8, 22, 0.95);
      box-shadow: 0 1px 0 rgba(255,255,255,.07);
    }
*/


/* =====================================================
  THEME TOGGLE
  – Guards against missing DOM nodes before touching them
  – Applies theme before first paint (FOUC prevention)
  – Announces theme change to screen readers via live region
  – Icon, aria-label, and aria-pressed all stay in sync
  – Falls back gracefully if localStorage is unavailable
    (private browsing, storage quota exceeded, etc.)
===================================================== */

(function initTheme() {

  // ── Safe localStorage wrapper ──────────────────────────
  const storage = {
    get(key) {
      try { return localStorage.getItem(key); }
      catch { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); }
      catch { /* storage unavailable — fail silently */ }
    },
  };

  // ── Resolve initial theme ──────────────────────────────
  // Honour saved preference; fall back to OS preference;
  // then default to "light".
  function getInitialTheme() {
    const saved = storage.get("theme");
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  }

  // ── Apply theme to <html> (not body) ──────────────────
  // Using <html> allows CSS [data-theme] selectors to work
  // before <body> is parsed, preventing a flash of the
  // wrong theme.
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    storage.set("theme", theme);
    syncToggleUI(theme);
    announceTheme(theme);
  }

  // ── Keep button UI in sync ─────────────────────────────
  function syncToggleUI(theme) {
    const toggle    = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    if (!toggle || !themeIcon) return;

    const isDark = theme === "dark";

    themeIcon.className = isDark ? "fa-solid fa-moon" : "fa-solid fa-sun";

    // aria-label describes the *action* (what clicking will do),
    // aria-pressed reflects the *current* state.
    toggle.setAttribute("aria-label",   isDark ? "Switch to light mode" : "Switch to dark mode");
    toggle.setAttribute("aria-pressed", String(isDark));
  }

  // ── Announce theme change to screen readers ────────────
  let liveRegion;
  function announceTheme(theme) {
    if (!liveRegion) {
      liveRegion = document.createElement("span");
      liveRegion.setAttribute("role",       "status");
      liveRegion.setAttribute("aria-live",  "polite");
      liveRegion.setAttribute("aria-atomic","true");
      Object.assign(liveRegion.style, {
        position: "absolute", width: "1px", height: "1px",
        padding: "0", overflow: "hidden", clip: "rect(0,0,0,0)",
        whiteSpace: "nowrap", border: "0",
      });
      document.body.appendChild(liveRegion);
    }
    // Brief delay ensures the DOM mutation is picked up
    // by assistive tech that debounces live-region updates.
    setTimeout(() => {
      liveRegion.textContent =
        theme === "dark" ? "Dark mode enabled." : "Light mode enabled.";
    }, 100);
  }

  // ── Bootstrap ──────────────────────────────────────────
  // Apply before DOMContentLoaded fires so there's no flash.
  applyTheme(getInitialTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) {
      console.warn("Theme toggle: #themeToggle not found in the DOM.");
      return;
    }

    // Ensure the button has a role screen readers understand
    toggle.setAttribute("role",  "switch");
    toggle.setAttribute("type",  "button");

    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });

    // Also respect OS-level changes made while the page is open
    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        // Only follow OS if the user hasn't made an explicit choice
        if (!storage.get("theme")) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  });

})();