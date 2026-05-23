/* =====================================================
FILTER BUTTONS
===================================================== */

const filterButtons =
  document.querySelectorAll(
    ".filter-btn"
  );

filterButtons.forEach(button=>{

  button.addEventListener(
    "click",
    ()=>{

      filterButtons.forEach(btn=>{

        btn.classList.remove(
          "active"
        );

      });

      button.classList.add(
        "active"
      );

    }
  );

});

/* =====================================================
LIGHTBOX
===================================================== */

const galleryCards =
  document.querySelectorAll(
    ".gallery-card img"
  );

const lightbox =
  document.getElementById(
    "lightbox"
  );

const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );

const closeLightbox =
  document.getElementById(
    "closeLightbox"
  );

galleryCards.forEach(image=>{

  image.addEventListener(
    "click",
    ()=>{

      lightbox.classList.add(
        "active"
      );

      lightboxImage.src =
        image.src;

    }
  );

});

/* CLOSE */

closeLightbox.addEventListener(
  "click",
  ()=>{

    lightbox.classList.remove(
      "active"
    );

  }
);

/* CLICK OUTSIDE */

lightbox.addEventListener(
  "click",
  (e)=>{

    if(e.target === lightbox){

      lightbox.classList.remove(
        "active"
      );

    }

  }
);

/* =====================================================
TOPBAR SCROLL EFFECT
===================================================== */

window.addEventListener(
  "scroll",
  ()=>{

    const topbar =
      document.querySelector(
        ".topbar"
      );

    if(window.scrollY > 20){

      topbar.style.background =
        "rgba(5,8,22,.95)";

    }else{

      topbar.style.background =
        "rgba(5,8,22,.82)";
    }

  }
);

/* =====================================================
BUTTON INTERACTION
===================================================== */

const primaryBtn =
  document.querySelector(
    ".primary-btn"
  );

primaryBtn.addEventListener(
  "click",
  ()=>{

    primaryBtn.innerText =
      "Uploading...";

    setTimeout(()=>{

      primaryBtn.innerText =
        "Upload UI";

    },2000);

  }
);

/* =====================================================
GALLERY INTERACTION
===================================================== */

const galleryCards = document.querySelectorAll(".gallery-card");

galleryCards.forEach((card) => {

  /* 3D HOVER EFFECT */

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 18) * -1;
    const rotateY = (x - centerX) / 18;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;

  });

  /* RESET */

  card.addEventListener("mouseleave", () => {

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;

  });

});

/* =====================================================
FILTER BUTTON ACTIVE
===================================================== */

const filterButtons =
  document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) =>
      btn.classList.remove("active")
    );

    button.classList.add("active");

  });

});

/* =====================================================
SEARCH FUNCTIONALITY
===================================================== */

const searchInput =
  document.querySelector(".search-box input");

searchInput.addEventListener("keyup", () => {

  const value =
    searchInput.value.toLowerCase();

  galleryCards.forEach((card) => {

    const text =
      card.innerText.toLowerCase();

    if (text.includes(value)) {

      card.style.display = "block";

    } else {

      card.style.display = "none";

    }

  });

});

/* =====================================================
LIGHTBOX
===================================================== */

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const closeLightbox =
  document.getElementById("closeLightbox");

const galleryImages =
  document.querySelectorAll(".gallery-card img");

/* OPEN LIGHTBOX */

galleryImages.forEach((image) => {

  image.addEventListener("click", () => {

    lightbox.classList.add("show");

    lightboxImage.src = image.src;

    document.body.style.overflow = "hidden";

  });

});

/* CLOSE BUTTON */

closeLightbox.addEventListener("click", () => {

  lightbox.classList.remove("show");

  document.body.style.overflow = "auto";

});

/* CLICK OUTSIDE */

lightbox.addEventListener("click", (e) => {

  if (e.target === lightbox) {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

  }

});

/* ESC KEY */

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

  }

});

/* =====================================================
AUTO FADE-IN ANIMATION
===================================================== */

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show-card");

      }

    });

  },

  {
    threshold: 0.2,
  }

);

galleryCards.forEach((card) => {

  card.classList.add("hidden-card");

  observer.observe(card);

});

/* =====================================================
RANDOM FLOAT EFFECT
===================================================== */

galleryCards.forEach((card, index) => {

  setInterval(() => {

    card.style.transform += `
      translateY(${Math.sin(Date.now() / 1000 + index) * 2}px)
    `;

  }, 100);

});

/* =====================================================
COUNTER ANIMATION
===================================================== */

const counters =
  document.querySelectorAll(".stat-box h2");

counters.forEach((counter) => {

  const updateCounter = () => {

    const target =
      +counter.innerText.replace(/\D/g, "");

    let count = +counter.getAttribute("data-count") || 0;

    const increment = target / 80;

    if (count < target) {

      count += increment;

      counter.setAttribute("data-count", count);

      counter.innerText =
        Math.floor(count) + "+";

      requestAnimationFrame(updateCounter);

    } else {

      counter.innerText =
        target + "+";

    }

  };

  updateCounter();

});

/* =====================================================
SIDEBAR MOBILE TOGGLE
===================================================== */

const sidebar =
  document.querySelector(".sidebar");

const mobileMenuBtn =
  document.createElement("button");

mobileMenuBtn.classList.add("mobile-menu-btn");

mobileMenuBtn.innerHTML =
  '<i class="fa-solid fa-bars"></i>';

document.body.appendChild(mobileMenuBtn);

mobileMenuBtn.addEventListener("click", () => {

  sidebar.classList.toggle("show-sidebar");

});

/* =====================================================
BUTTON RIPPLE EFFECT
===================================================== */

const buttons =
  document.querySelectorAll("button");

buttons.forEach((button) => {

  button.addEventListener("click", (e) => {

    const ripple =
      document.createElement("span");

    ripple.classList.add("ripple");

    const rect =
      button.getBoundingClientRect();

    ripple.style.left =
      `${e.clientX - rect.left}px`;

    ripple.style.top =
      `${e.clientY - rect.top}px`;

    button.appendChild(ripple);

    setTimeout(() => {

      ripple.remove();

    }, 600);

  });

});