/* Toggle Code Block */
function toggleCode(id) {
  const el = document.getElementById(id);

  if (el.style.display === "block") {
    el.style.display = "none";
  } else {
    el.style.display = "block";
  }
}

/* Copy Code with Better UX */
function copyCode(id, btn) {
  const code = document.getElementById(id).innerText;

  navigator.clipboard.writeText(code)
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
const searchInput = document.getElementById("searchInput");
const components = document.querySelectorAll(".component-card");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();

    components.forEach((item) => {
      const text = item.dataset.name.toLowerCase();

      if (text.includes(value)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}