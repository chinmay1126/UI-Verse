/* =====================================================
ACCORDIONS
===================================================== */

const accordionItems =
  document.querySelectorAll(
    ".accordion-item"
  );

accordionItems.forEach(item=>{

  const button =
    item.querySelector(
      ".accordion-btn"
    );

  if (button) {
    button.addEventListener(
      "click",
      ()=>{

        const isActive =
          item.classList.contains(
            "active"
          );

        accordionItems.forEach(i=>
          i.classList.remove(
            "active"
          )
        );

        if(!isActive){

          item.classList.add(
            "active"
          );

        }

      }
    );
  }

});

/* =====================================================
NAVBAR SCROLL
===================================================== */

const navbar =
  document.querySelector(
    ".navbar"
  );

if (navbar) {
  window.addEventListener(
    "scroll",
    ()=>{

      if(window.scrollY > 20){

        navbar.style.background =
          "rgba(5,8,22,.95)";

      }else{

        navbar.style.background =
          "rgba(5,8,22,.82)";
      }

    }
  );
}


document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.add(savedTheme);

    const themeIcon = document.getElementById("themeIcon");
    themeIcon.className = savedTheme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    const themeIcon = document.getElementById("themeIcon");

    if (document.body.classList.contains("light")) {
      document.body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      themeIcon.className = "fa-solid fa-moon"; // 🌙
    } else {
      document.body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      themeIcon.className = "fa-solid fa-sun"; // ☀️
    }
  });