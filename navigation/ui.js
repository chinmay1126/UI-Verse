const nav = document.querySelectorAll(".nav-item");
const indicator = document.querySelector(".indicator");

function updateIndicator(el) {
  const rect = el.getBoundingClientRect();
  const parentRect = el.parentElement.getBoundingClientRect();

  indicator.style.left = `${el.offsetLeft}px`;
}

nav.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    nav.forEach(n => n.classList.remove("active"));
    item.classList.add("active");

    updateIndicator(item);
  });
});

// initial position
updateIndicator(document.querySelector(".nav-item.active"));