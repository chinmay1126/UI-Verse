/* =====================================================
CHECKBOX INTERACTIONS
===================================================== */

const checkboxes =
  document.querySelectorAll(
    'input[type="checkbox"]'
  );

checkboxes.forEach(box=>{

  box.addEventListener(
    "change",
    ()=>{

      const card =
        box.closest(
          ".checkbox-card"
        );

      if(card){

        card.style.transform =
          "scale(.98)";

        setTimeout(()=>{

          card.style.transform =
            "scale(1)";

        },180);

      }

    }
  );

});

/* =====================================================
PRIMARY BUTTON
===================================================== */

const exploreBtn =
  document.querySelector(
    ".primary-btn"
  );

exploreBtn.addEventListener(
  "click",
  ()=>{

    exploreBtn.innerText =
      "Loaded ✓";

    setTimeout(()=>{

      exploreBtn.innerText =
        "Explore UI";

    },1800);

  }
);

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


const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".component-card").forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    card.style.display =
      title.includes(value) ? "flex" : "none";
  });
});

document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {

    document.querySelectorAll(".filters button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    const filter = btn.textContent.toLowerCase();

    document.querySelectorAll(".component-card").forEach(card => {

      if (
        filter === "all" ||
        card.dataset.category.includes(filter)
      ) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }

    });
  });
});

function updateCounter() {
  const checked =
    document.querySelectorAll(
      '.card-preview input[type="checkbox"]:checked'
    ).length;

  document.getElementById("checkedCount").textContent =
    checked;
}

document
  .querySelectorAll('.card-preview input[type="checkbox"]')
  .forEach(cb => {
    cb.addEventListener("change", updateCounter);
  });

updateCounter();