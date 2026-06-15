/* =====================================================
BUTTONS
===================================================== */

const buttons =
  document.querySelectorAll(
    ".show-btn"
  );

const container =
  document.getElementById(
    "snackbarContainer"
  );

/* =====================================================
SHOW SNACKBAR
===================================================== */

buttons.forEach(button=>{

  button.addEventListener(
    "click",
    ()=>{

      const type =
        button.dataset.type;

      createSnackbar(type);

    }
  );

});

/* =====================================================
CREATE SNACKBAR
===================================================== */

function createSnackbar(type){

  const snackbar =
    document.createElement(
      "div"
    );

  snackbar.classList.add(
    "snackbar",
    type
  );

  let icon = "";
  let title = "";
  let message = "";

  if(type === "success"){

    icon =
      "fa-circle-check";

    title =
      "Success";

    message =
      "Component added successfully.";

  }

  if(type === "error"){

    icon =
      "fa-circle-xmark";

    title =
      "Error";

    message =
      "Something went wrong.";

  }

  if(type === "info"){

    icon =
      "fa-circle-info";

    title =
      "Information";

    message =
      "New UI update available.";

  }

  snackbar.innerHTML = `

    <div class="snackbar-left">

      <i class="fa-solid ${icon}"></i>

      <div>

        <strong>${title}</strong>

        <p>${message}</p>

      </div>

    </div>

    <i class="fa-solid fa-xmark close-snackbar"></i>

  `;

  container.appendChild(
    snackbar
  );

  /* AUTO REMOVE */

  setTimeout(()=>{

    snackbar.remove();

  },4000);

  /* CLOSE */

  snackbar
    .querySelector(
      ".close-snackbar"
    )
    .addEventListener(
      "click",
      ()=>{

        snackbar.remove();

      }
    );

}

/* =====================================================
NAVBAR SCROLL
===================================================== */

window.addEventListener(
  "scroll",
  ()=>{

    const navbar =
      document.querySelector(
        ".navbar"
      );

    if(window.scrollY > 20){

      navbar.style.background =
        "rgba(5,8,22,.95)";

    }else{

      navbar.style.background =
        "rgba(5,8,22,.82)";
    }

  }
);



const container = document.getElementById("snackbarContainer");

function createSnackbar(type, title, message, duration = 4000) {
  const snackbar = document.createElement("div");
  snackbar.classList.add("snackbar", type);

  const iconMap = {
    success: "fa-circle-check",
    error: "fa-circle-xmark",
    info: "fa-circle-info",
  };

  snackbar.innerHTML = `
    <div class="snackbar-icon">
      <i class="fa-solid ${iconMap[type]}"></i>
    </div>

    <div class="snackbar-content">
      <div class="snackbar-title">${title}</div>
      <div class="snackbar-message">${message}</div>
    </div>

    <div class="snackbar-close">
      <i class="fa-solid fa-xmark"></i>
    </div>

    <div class="snackbar-progress">
      <div class="snackbar-progress-bar"></div>
    </div>
  `;

  container.appendChild(snackbar);

  // Close button
  snackbar.querySelector(".snackbar-close").onclick = () => removeSnackbar(snackbar);

  // Auto remove
  const timeout = setTimeout(() => {
    removeSnackbar(snackbar);
  }, duration);

  function removeSnackbar(el) {
    clearTimeout(timeout);
    el.classList.add("hide");
    setTimeout(() => el.remove(), 300);
  }
}

// Button triggers
document.querySelectorAll(".show-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;

    if (type === "success") {
      createSnackbar("success", "Success", "Your action was completed successfully!");
    }

    if (type === "error") {
      createSnackbar("error", "Error", "Something went wrong. Try again.");
    }

    if (type === "info") {
      createSnackbar("info", "Info", "Here is some useful information.");
    }
  });
});
/* ============================================================
   THEME STYLING LOGIC (theme.js)
   - Checks and applies dark/light mode immediately (pre-render)
   - Binds event listeners to theme toggles on DOM ready
   - Ensures visual synchronization of all toggles on the page
   ============================================================ */

// 1. Immediate execution to prevent theme flashing
(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
  } else {
    // Default to system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
})();

// 2. Binding events when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtnIds = ['darkModeToggle', 'theme-toggle', 'themeToggle'];
  const toggleClasses = ['theme-toggle', 'theme-toggle-sidebar', 'theme-toggle-floating'];

  // Helper to collect all toggle buttons on the page
  function getAllToggles() {
    const toggles = new Set();
    
    // Add by IDs
    toggleBtnIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) toggles.add(el);
    });

    // Add by classes
    toggleClasses.forEach(className => {
      document.querySelectorAll('.' + className).forEach(el => toggles.add(el));
    });

    return Array.from(toggles);
  }

  // Helper to update a button's visual state (text and icon)
  function updateToggleVisual(btn) {
    if (!btn) return;
    const isDark = document.body.classList.contains('dark-mode');
    
    // Check if it's a sidebar toggle or text-based toggle
    if (btn.classList.contains('theme-toggle-sidebar') || btn.innerText.includes('Theme')) {
      btn.innerHTML = isDark 
        ? '<i class="fa-solid fa-sun"></i> Light Theme' 
        : '<i class="fa-solid fa-moon"></i> Dark Theme';
    } else {
      // Icon-only toggle (like in navbar or floating)
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      } else {
        btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
      }
    }
  }

  // Sync visual state of all toggles on page load
  function syncAllToggles() {
    getAllToggles().forEach(btn => updateToggleVisual(btn));
  }

  // Handle theme toggle action
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Sync all toggles on the page
    syncAllToggles();

    // Fire custom event so page components can adapt if needed
    const event = new CustomEvent('themeChanged', { detail: { theme: isDark ? 'dark' : 'light' } });
    document.dispatchEvent(event);
  }

  // Dynamic self-healing: if no toggle exists on the page, create one
  let pageToggles = getAllToggles();
  if (pageToggles.length === 0) {
    const navRight = document.querySelector('.nav-right');
    const navbar = document.querySelector('.navbar') || document.querySelector('header.navbar') || document.querySelector('nav.navbar');
    const sidebarList = document.querySelector('.sidebar ul') || document.querySelector('.sidebar-nav ul');
    const sidebar = document.querySelector('.sidebar') || document.querySelector('aside.sidebar');

    if (navRight) {
      // Insert in navbar right section
      const btn = document.createElement('button');
      btn.id = 'darkModeToggle';
      btn.className = 'theme-toggle';
      btn.title = 'Toggle Theme';
      btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      navRight.appendChild(btn);
    } else if (navbar) {
      // Append to navbar
      const btn = document.createElement('button');
      btn.id = 'darkModeToggle';
      btn.className = 'theme-toggle';
      btn.style.marginLeft = 'auto';
      btn.title = 'Toggle Theme';
      btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      navbar.appendChild(btn);
    } else if (sidebarList) {
      // Append as sidebar link item
      const li = document.createElement('li');
      li.className = 'theme-toggle-item';
      const btn = document.createElement('button');
      btn.id = 'darkModeToggle';
      btn.className = 'theme-toggle-sidebar';
      btn.title = 'Toggle Theme';
      btn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Theme';
      li.appendChild(btn);
      sidebarList.appendChild(li);
    } else if (sidebar) {
      // Append directly to sidebar
      const btn = document.createElement('button');
      btn.id = 'darkModeToggle';
      btn.className = 'theme-toggle-sidebar';
      btn.title = 'Toggle Theme';
      btn.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Theme';
      sidebar.appendChild(btn);
    } else {
      // Floating button in corner
      const btn = document.createElement('button');
      btn.id = 'darkModeToggle';
      btn.className = 'theme-toggle theme-toggle-floating';
      btn.title = 'Toggle Theme';
      btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      document.body.appendChild(btn);
    }
    
    // Refresh toggle list
    pageToggles = getAllToggles();
  }

  // Attach click listener to all buttons
  pageToggles.forEach(btn => {
    btn.addEventListener('click', toggleTheme);
    updateToggleVisual(btn);
  });
});