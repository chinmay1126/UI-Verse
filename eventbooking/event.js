const bookButtons = document.querySelectorAll(".book-btn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");

bookButtons.forEach(button => {
  button.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.style.display = "none";
  }
}); 
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const bookButtons = document.querySelectorAll(".book-btn");

// Open modal
bookButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const eventName = btn.dataset.event;

    modalTitle.textContent = "Booking Confirmed 🎉";
    modalText.textContent = `You have successfully booked: ${eventName}`;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

// Close modal
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

closeBtn.addEventListener("click", closeModal);

// Close on outside click
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Close on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});