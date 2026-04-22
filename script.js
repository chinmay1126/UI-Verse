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
  if (codeBlock.style.display === "block") {
    codeBlock.style.display = "none";
  } else {
    codeBlock.style.display = "block";
  }
}
 
/* COPY CODE */
function copyCode(id, btn) {
  const code = document.getElementById(id).innerText;
 
  navigator.clipboard.writeText(code)
    .then(() => {
      showToast("Code copied!");
 
      if (btn) {
        btn.innerText = "Copied!";
        btn.style.background = "#00b894";
        setTimeout(() => {
          btn.innerText = "Copy";
          btn.style.background = "#111";
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
 
window.addEventListener('DOMContentLoaded', function () {
  restoreSidebarState();
  updateSidebarActiveLink();
  initSidebarLinkClose();
});
 
/* SEARCH (INLINE FILTER) */
const searchInput = document.getElementById("searchInput");
const components = document.querySelectorAll(".component-card");
 
if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();
    components.forEach((item) => {
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
const toggleBtn = document.getElementById("theme-toggle");
 
if (toggleBtn) {
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
 
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.innerText = "☀️ Light Mode";
    }
  });
}