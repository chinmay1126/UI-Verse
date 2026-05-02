// ================= POPUP =================
let popup;

document.addEventListener("DOMContentLoaded", () => {
  popup = document.getElementById("popup");
});

function openPopup() {
  if (popup) popup.classList.add("open-popup");
}

function closePopup() {
  if (popup) popup.classList.remove("open-popup");
}


// ================= TOAST NOTIFICATION =================
function showToast(message) {
  const existing = document.getElementById("toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast-notification";
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("toast-visible");
  });

  setTimeout(() => {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-hidden");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 2000);
}


// ================= TOGGLE CODE BLOCK =================
function toggleCode(id) {
  const codeBlock = document.getElementById(id);
  if (!codeBlock) return;

  codeBlock.classList.toggle("show");
}


// ================= COPY CODE =================
function copyCode(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;

  const code = el.innerText;

  navigator.clipboard.writeText(code)
    .then(() => {
      showToast("Code copied!");

      if (btn) {
        const originalText = btn.innerText;

        btn.innerText = "Copied ✓";
        btn.classList.add("copied");

        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.remove("copied");
        }, 1500);
      }
    })
    .catch(() => {
      showToast("Failed to copy ❌");

      if (btn) btn.innerText = "Error";
    });
}


// ================= COPY COLOR =================
function copyColor(color) {
  navigator.clipboard.writeText(color);
  showToast(color + " copied!");
}


// ================= SIDEBAR =================
function toggleSidebar() {
  if (window.innerWidth <= 900) {
    document.body.classList.toggle('sidebar-open');
  } else {
    const isHidden = document.body.classList.toggle('sidebar-hidden');
    sessionStorage.setItem('sidebarHidden', isHidden ? '1' : '0');
  }
}

function updateSidebarActiveLink() {
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

  document.querySelectorAll('.sidebar ul li').forEach((li) => {
    const anchor = li.querySelector('a');
    if (!anchor) return;

    if (anchor.getAttribute('href').toLowerCase() === currentPage) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
}

function restoreSidebarState() {
  if (window.innerWidth > 900 && sessionStorage.getItem('sidebarHidden') === '1') {
    document.body.classList.add('sidebar-hidden');
  }
}

function initSidebarLinkClose() {
  document.querySelectorAll('.sidebar ul li a').forEach((anchor) => {
    anchor.addEventListener('click', function () {
      if (window.innerWidth <= 900) {
        document.body.classList.remove('sidebar-open');
      }
    });
  });
}


// ================= SEARCH (FILTER) =================
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const components = document.querySelectorAll(".component-card");

  if (searchInput) {
    searchInput.addEventListener("keyup", function () {
      const value = this.value.toLowerCase();

      components.forEach((item) => {
        const text = (item.dataset.name || item.innerText).toLowerCase();
        item.style.display = text.includes(value) ? "block" : "none";
      });
    });
  }
});


// ================= SEARCH (ROUTING) =================
function handleSearch(event) {
  if (event.key === "Enter") {
    const query = event.target.value.toLowerCase().trim();

    const routes = {
      "button": "button.html",
      "buttons": "button.html",
      "navbar": "navbar.html",
      "navbars": "navbar.html",
      "card": "cards.html",
      "cards": "cards.html",
      "form": "form.html",
      "forms": "form.html",
      "footer": "footer.html",
      "color": "color.html",
      "colors": "color.html"
    };

    for (let key in routes) {
      if (query.includes(key)) {
        window.location.href = routes[key];
        return;
      }
    }

    showToast("No component found 😢");
  }
}


// ================= DARK MODE =================
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  const toggleBtn = document.getElementById("theme-toggle");

  if (toggleBtn) {
    toggleBtn.innerText = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.innerText = "☀️ Light Mode";
      } else {
        localStorage.setItem("theme", "light");
        toggleBtn.innerText = "🌙 Dark Mode";
      }
    });
  }

  // Init sidebar after DOM ready
  restoreSidebarState();
  updateSidebarActiveLink();
  initSidebarLinkClose();
});
/* ================= POPUP ================= */
let popup = document.getElementById("popup");

function openPopup() {
  popup?.classList.add("open-popup");
}

function closePopup() {
  popup?.classList.remove("open-popup");
}


/* ================= TOAST ================= */
function showToast(message) {
  const existing = document.getElementById("toast-notification");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast-notification";
  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("toast-visible");
  });

  setTimeout(() => {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-hidden");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 2000);
}


/* ================= TOGGLE CODE BLOCK ================= */
function toggleCode(id) {
  const codeBlock = document.getElementById(id);
  if (!codeBlock) return;
  if (codeBlock.style.display === "block" || codeBlock.classList.contains("show")) {
    codeBlock.style.display = "none";
    codeBlock.classList.remove("show");
  } else {
    codeBlock.style.display = "block";
    codeBlock.classList.add("show");
  }
}


/* ================= COPY CODE ================= */
function copyCode(id, btn) {
  const element = document.getElementById(id);
  if (!element) return;

  const code = element.value || element.innerText;

  navigator.clipboard.writeText(code)
    .then(() => {
      showToast("Code copied!");

      if (btn) {
        const originalText = btn.innerText;
        btn.innerText = "Copied ✓";
        btn.classList.add("copied");

        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.remove("copied");
        }, 1500);
      }
    })
    .catch(() => {
      if (btn) btn.innerText = "Error";
    });
}


/* ================= COPY COLOR ================= */
function copyColor(color) {
  navigator.clipboard.writeText(color);
  showToast(color + " copied!");
}


/* ================= SIDEBAR TOGGLE ================= */
function toggleSidebar() {
  const backdrop = document.querySelector('.sidebar-backdrop');
  if (window.innerWidth <= 900) {
    document.body.classList.toggle('sidebar-open');
    if (backdrop) {
      backdrop.classList.toggle('active');
    }
  } else {
    const isHidden = document.body.classList.toggle('sidebar-hidden');
    sessionStorage.setItem('sidebarHidden', isHidden ? '1' : '0');
  }
}

function updateSidebarActiveLink() {
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.sidebar ul li').forEach((li) => {
    const anchor = li.querySelector('a');
    if (!anchor) return;
    if (anchor.getAttribute('href').toLowerCase() === currentPage) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
}

function restoreSidebarState() {
  if (window.innerWidth > 900 && sessionStorage.getItem('sidebarHidden') === '1') {
    document.body.classList.add('sidebar-hidden');
  }
}

function initSidebarLinkClose() {
  document.querySelectorAll('.sidebar ul li a').forEach((anchor) => {
    anchor.addEventListener('click', function () {
      if (window.innerWidth <= 900) {
        document.body.classList.remove('sidebar-open');
        document.querySelector('.sidebar-backdrop')?.classList.remove('active');
      }
    });
  });
}


/* ================= INIT SIDEBAR ================= */
function initSidebar() {
  restoreSidebarState();
  updateSidebarActiveLink();
  initSidebarLinkClose();
}


/* ================= LIVE SANDBOX ================= */
function initLiveSandboxes() {
  const componentCards = document.querySelectorAll('.component-card');

  componentCards.forEach((card, index) => {
    const h3 = card.querySelector('h3');
    const actions = card.querySelector('.actions');
    const existingCodeBlock = card.querySelector('.code-block');

    const previewNodes = Array.from(card.childNodes).filter(node => {
      return (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')) &&
             node !== h3 &&
             node !== actions &&
             node !== existingCodeBlock &&
             node.nodeName !== 'SCRIPT';
    });

    if (previewNodes.length === 0 && !existingCodeBlock) return;

    let initialHTML = existingCodeBlock
      ? existingCodeBlock.textContent.trim()
      : previewNodes.map(n => n.outerHTML || n.textContent).join('\n').trim();

    previewNodes.forEach(node => node.remove());

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.minHeight = '160px';
    iframe.style.border = '1px solid #e8ebf2';
    iframe.style.borderRadius = '8px';

    const textarea = document.createElement('textarea');
    textarea.id = existingCodeBlock ? existingCodeBlock.id : 'live-code-' + index;
    textarea.className = 'code-block';
    textarea.value = initialHTML;
    textarea.style.display = 'none';

    const renderIframe = (html) => {
      iframe.srcdoc = `
        <html>
        <head><link rel="stylesheet" href="style.css"></head>
        <body style="display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;">
          ${html}
        </body>
        </html>`;
    };

    renderIframe(initialHTML);
    textarea.addEventListener('input', (e) => renderIframe(e.target.value));

    h3?.after(iframe);
    actions?.after(textarea);

    if (existingCodeBlock) existingCodeBlock.replaceWith(textarea);
  });
}


/* ================= SEARCH (INLINE FILTER) ================= */
const searchInput = document.getElementById("searchInput");
const components = document.querySelectorAll(".component-card");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase().trim();
    components.forEach((item) => {
      const name = item.dataset.name?.toLowerCase() || item.innerText.toLowerCase();
      item.style.display = name.includes(value) ? "block" : "none";
    });
  });
}


/* ================= SEARCH (PAGE ROUTING) ================= */
function handleSearch(event) {
  if (event.key !== "Enter") return;

  const query = event.target.value.toLowerCase().trim();

  const routes = {
    "button":  "button.html",
    "buttons": "button.html",
    "navbar":  "navbar.html",
    "navbars": "navbar.html",
    "card":    "cards.html",
    "cards":   "cards.html",
    "form":    "form.html",
    "forms":   "form.html",
    "footer":  "footer.html",
    "color":   "color.html",
    "colors":  "color.html"
  };

  for (let key in routes) {
    if (query.includes(key)) {
      window.location.href = routes[key];
      return;
    }
  }

  showToast("No component found 😢");
}


/* ================= DARK MODE ================= */
const themeToggle = document.getElementById("theme-toggle");

function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.innerText = "☀️ Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggle) themeToggle.innerText = "🌙 Dark Mode";
  }
}

if (!localStorage.getItem("theme")) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
  }
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});


/* ================= SCROLL TO TOP ================= */
const btn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (!btn) return;
  btn.style.display = window.scrollY > 50 ? "block" : "none";
});

btn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ================= ALERT CLOSE ================= */
function closeAlert(alertId) {
  const alert = document.getElementById(alertId);
  if (alert) alert.style.display = "none";
}


/* ================= SUBSCRIBE ================= */
function subscribe(e) {
  e.preventDefault();
  showToast("Subscribed successfully! 🎉");
}


/* ================= INIT ================= */
window.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initLiveSandboxes();
  loadTheme();
});
