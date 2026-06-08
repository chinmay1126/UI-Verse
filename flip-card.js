const flipCard = document.getElementById("flipCard");

flipCard.addEventListener("click", () => {
  flipCard.classList.toggle("active");
});

const learnBtn = document.getElementById("learnBtn");

learnBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  alert("More frontend content coming soon!");
});