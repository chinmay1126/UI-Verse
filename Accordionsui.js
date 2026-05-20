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

});

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