/* =====================================================
   SETTINGS PAGE INTERACTIONS
===================================================== */

"use strict";

/* =====================================================
   THEME SELECT
===================================================== */

const themeCards =
  document.querySelectorAll(".theme-card");

if (themeCards.length > 0) {

  themeCards.forEach(card => {

    card.setAttribute("tabindex", "0");

    card.addEventListener("click", () => {
      activateTheme(card);
    });

    card.addEventListener("keydown", event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        activateTheme(card);

      }

    });

  });

}

function activateTheme(selectedCard) {

  themeCards.forEach(card => {

    card.classList.remove("active-theme");

    card.setAttribute(
      "aria-selected",
      "false"
    );

  });

  selectedCard.classList.add(
    "active-theme"
  );

  selectedCard.setAttribute(
    "aria-selected",
    "true"
  );

}

/* =====================================================
   SAVE BUTTON
===================================================== */

const saveBtn =
  document.querySelector(".primary-btn");

if (saveBtn) {

  saveBtn.addEventListener(
    "click",
    () => {

      const originalText =
        saveBtn.textContent;

      saveBtn.disabled = true;

      saveBtn.textContent =
        "Saved ✓";

      saveBtn.classList.add(
        "saved-state"
      );

      setTimeout(() => {

        saveBtn.textContent =
          originalText;

        saveBtn.disabled = false;

        saveBtn.classList.remove(
          "saved-state"
        );

      }, 2000);

    }
  );

}

/* =====================================================
   SECURITY BUTTONS
===================================================== */

const securityBtns =
  document.querySelectorAll(
    ".security-btn"
  );

if (securityBtns.length > 0) {

  securityBtns.forEach(btn => {

    btn.addEventListener(
      "click",
      () => {

        btn.classList.add(
          "btn-clicked"
        );

        setTimeout(() => {

          btn.classList.remove(
            "btn-clicked"
          );

        }, 300);

      }
    );

  });

}

/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar =
  document.querySelector(".navbar");

if (navbar) {

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(() => {

          if (window.scrollY > 20) {

            navbar.classList.add(
              "navbar-scrolled"
            );

          } else {

            navbar.classList.remove(
              "navbar-scrolled"
            );

          }

          ticking = false;

        });

        ticking = true;

      }

    }
  );

}