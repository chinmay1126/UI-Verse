const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  startBtn.innerText = "Welcome 🚀";

  startBtn.style.transform = "scale(1.05)";

  setTimeout(() => {
    startBtn.style.transform = "scale(1)";
  }, 300);
});