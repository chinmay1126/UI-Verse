// =========================================================
// FILTER ACTIVE
// =========================================================

const filters = document.querySelectorAll(".filter-btn");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// =========================================================
// COPY — basic cards
// =========================================================

document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".icon-card");
    if (!card) return;
    const p = card.querySelector("p");
    if (!p) return;
    const iconName = p.innerText.trim();

    navigator.clipboard.writeText(iconName).then(() => {
      btn.innerText = "Copied!";
      setTimeout(() => { btn.innerText = "Copy"; }, 1500);
    }).catch(() => {
      // fallback for file:// protocol
      const ta = document.createElement("textarea");
      ta.value = iconName;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      btn.innerText = "Copied!";
      setTimeout(() => { btn.innerText = "Copy"; }, 1500);
    });
  });
});

// =========================================================
// COPY — advanced cards
// =========================================================

document.querySelectorAll(".copy-icon-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".advanced-icon-card");
    if (!card) return;
    const p = card.querySelector("p");
    if (!p) return;
    const iconName = p.innerText.trim();

    navigator.clipboard.writeText(iconName).then(() => {
      btn.innerText = "Copied!";
      setTimeout(() => { btn.innerText = "Copy Icon"; }, 1500);
    }).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = iconName;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      btn.innerText = "Copied!";
      setTimeout(() => { btn.innerText = "Copy Icon"; }, 1500);
    });
  });
});

// =========================================================
// SEARCH FILTER
// =========================================================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll(".icon-card").forEach((card) => {
      card.style.display = card.innerText.toLowerCase().includes(value) ? "block" : "none";
    });
  });
}

// fix for oninput="liveFilter()" called in HTML
function liveFilter(value) {
  document.querySelectorAll(".icon-card").forEach((card) => {
    card.style.display = card.innerText.toLowerCase().includes(value.toLowerCase()) ? "block" : "none";
  });
}