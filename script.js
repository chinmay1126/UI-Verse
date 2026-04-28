/* Toggle Sidebar on mobile and desktop */
// popup

let popup = document.getElementById("popup");

function openPopup(){
  popup.classList.add("open-popup");
}

function closePopup(){
  popup.classList.remove("open-popup");
}





/* Toggle Code Block */
function toggleCode(id) {
  const el = document.getElementById(id);
/* TOAST NOTIFICATION */
}
function showToast(message) {

  const existing = document.getElementById("toast-notification");
  if (existing) existing.remove();
 
  const toast = document.createElement("div");
  toast.id = "toast-notification";
  toast.className = "toast";
  toast.textContent = message;
 
  document.body.appendChild(toast);
 
  // Trigger slide-in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add("toast-visible");
    });
  });
 
  // Auto-dismiss after 2 seconds
  setTimeout(() => {
    toast.classList.remove("toast-visible");
    toast.classList.add("toast-hidden");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, 2000);
}
 
/* TOGGLE CODE BLOCK */
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
 
/* COPY CODE */
function copyCode(id, btn) {
  const element = document.getElementById(id);
  if (!element) return;
  
  const code = (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') ? element.value : element.innerText;
 
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
 
/* COPY COLOR */
function copyColor(color) {
  navigator.clipboard.writeText(color);
  showToast(color + " copied!");
}
 
/* SIDEBAR TOGGLE */
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

/* Restore sidebar hidden state on desktop */
 
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
        const backdrop = document.querySelector('.sidebar-backdrop');
        if (backdrop) {
          backdrop.classList.remove('active');
        }
      }
    });
  });
}

/* Initialize sidebar on every page load */
function initSidebar() {
  restoreSidebarState();
  updateSidebarActiveLink();
  initSidebarLinkClose();
}

/* Run on page load */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar(); // Already loaded
}

// Other functionality
function toggleCode(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === "block" ? "none" : "block";
  }
}

function copyCode(id, btn) {
  const code = document.getElementById(id);
  if (!code) return;
  
  navigator.clipboard.writeText(code.innerText)
    .then(() => {
      btn.innerText = "Copied!";
      btn.style.background = "#00b894";
      setTimeout(() => {
        btn.innerText = "Copy";
        btn.style.background = "#111";
      }, 1500);
    })
    .catch(() => {
      btn.innerText = "Error";
    });
}

// Search functionality
const searchInput = document.getElementById("searchInput");
const components = document.querySelectorAll(".component-card");
 
window.addEventListener('DOMContentLoaded', function () {
  restoreSidebarState();
  updateSidebarActiveLink();
  initSidebarLinkClose();
  initLiveSandboxes();
});

/* LIVE IFRAME SANDBOX INITIALIZATION */
function initLiveSandboxes() {
  const componentCards = document.querySelectorAll('.component-card');

  componentCards.forEach((card, index) => {
    const h3 = card.querySelector('h3');
    const actions = card.querySelector('.actions');
    const existingCodeBlock = card.querySelector('.code-block');
    
    // Find static preview elements (exclude h3, actions, code-block, script)
    const previewNodes = Array.from(card.childNodes).filter(node => {
      return (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')) && 
             node !== h3 && 
             node !== actions && 
             node !== existingCodeBlock && 
             node.nodeName !== 'SCRIPT';
    });
    
    if (previewNodes.length === 0 && !existingCodeBlock) return;
    
    // Extract HTML code
    let initialHTML = '';
    if (existingCodeBlock) {
      initialHTML = existingCodeBlock.textContent.trim();
    } else {
      initialHTML = previewNodes.map(n => n.outerHTML || n.textContent).join('\\n').trim();
    }
    
    // Replace old preview elements
    previewNodes.forEach(node => node.remove());

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.minHeight = '160px';
    iframe.style.border = '1px solid #e8ebf2';
    iframe.style.borderRadius = '8px';
    iframe.style.background = 'transparent';
    
    // Create textarea
    const textarea = document.createElement('textarea');
    if (existingCodeBlock) {
      textarea.id = existingCodeBlock.id;
      textarea.className = existingCodeBlock.className;
      textarea.style.display = existingCodeBlock.style.display || 'none';
    } else {
      textarea.id = 'live-code-' + index;
      textarea.className = 'code-block';
      textarea.style.display = 'none';
      if (actions) {
        const toggleBtn = actions.querySelector('button[onclick^="toggleCode"]');
        const copyBtn = actions.querySelector('button[onclick^="copyCode"]');
        if (toggleBtn) toggleBtn.setAttribute('onclick', 'toggleCode(\"' + textarea.id + '\")');
        if (copyBtn) copyBtn.setAttribute('onclick', 'copyCode(\"' + textarea.id + '\", this)');
      }
    }
    
    textarea.value = initialHTML;
    textarea.style.width = '100%';
    textarea.style.minHeight = '120px';
    textarea.style.boxSizing = 'border-box';
    textarea.style.resize = 'vertical';
    
    // Function to render iframe content
    const renderIframe = (htmlContent) => {
      const srcDocContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <link rel="stylesheet" href="style.css">
          <style>
            body { 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              margin: 0; 
              background: transparent; 
              padding: 20px;
              box-sizing: border-box;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `;
      iframe.srcdoc = srcDocContent;
    };
    
    renderIframe(initialHTML);
    
    // Debounced input
    let timeout;
    textarea.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        renderIframe(e.target.value);
      }, 300);
    });
    
    // Insert iframe and textarea
    if (h3) {
      h3.after(iframe);
    } else {
      card.insertBefore(iframe, card.firstChild);
    }
    
    if (existingCodeBlock) {
      existingCodeBlock.replaceWith(textarea);
    } else if (actions) {
      actions.after(textarea);
    }
  });
}
 
/* SEARCH (INLINE FILTER) */
const searchInput = document.getElementById("searchInput");
const components = document.querySelectorAll(".component-card");
 
if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();
    components.forEach((item) => {
      const text = item.dataset.name?.toLowerCase() || '';
      item.style.display = text.includes(value) ? "block" : "none";
    });
      const text = item.dataset.name.toLowerCase();
      item.style.display = text.includes(value) ? "block" : "none";
    });
  });
}
 
/* SEARCH (PAGE ROUTING) */
function handleSearch(event) {
  if (event.key === "Enter") {
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
}
 
/* DARK MODE TOGGLE */
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    if (document.body.classList.contains("dark-mode")) {
      toggleBtn.innerText = "☀️ Light Mode";
    }
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

const btn = document.getElementById("scrollTopBtn");

// show btn when scrolling down
window.onscroll = function () {
  if (document.documentElement.scrollTop > 50) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// scroll to top
btn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const toggleBtn = document.getElementById("darkModeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

// Toggle dark mode
toggleBtn.onclick = function () {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
};

/* CLOSE ALERT */
function closeAlert(alertId) {
  const alert = document.getElementById(alertId);
  if (alert) {
    alert.style.display = "none";
  }
}
  }
});
