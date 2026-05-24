/* =======================================================
SEARCH
======================================================= */

const searchInput =
  document.getElementById("searchInput");

const cards =
  document.querySelectorAll(".blog-card");

searchInput.addEventListener("input",e=>{

  const value =
    e.target.value.toLowerCase();

  cards.forEach(card=>{

    const text =
      card.innerText.toLowerCase();

    card.style.display =
      text.includes(value)
      ? "block"
      : "none";

  });

});

/* =======================================================
FILTERS
======================================================= */

const filterBtns =
  document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn=>{

  btn.addEventListener("click",()=>{

    filterBtns.forEach(b=>
      b.classList.remove("active")
    );

    btn.classList.add("active");

  });

});

/* =======================================================
SCROLL ANIMATION
======================================================= */

window.addEventListener("scroll",()=>{

  const navbar =
    document.querySelector(".navbar");

  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 20
  );

});

/* ==============================
Filter Scearch
================================*/

const input = document.getElementById("blogSearch");
input.addEventListener("input", function () {
  const filter = input.value.toLowerCase();
  const cards = document.querySelectorAll(".blog-card");
  cards.forEach(card => {
    const data = card.textContent.toLowerCase();
    if (data.includes(filter)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
});