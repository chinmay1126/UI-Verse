document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");

  if (!toggle) return;

  // Restore theme
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark")
        ? "dark"
        : "light"
    );
  });
});