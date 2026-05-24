const refreshBtn = document.getElementById("refreshBtn");
const bars = document.querySelectorAll(".bar");

refreshBtn.addEventListener("click", () => {

  bars.forEach((bar) => {

    const randomHeight = Math.floor(Math.random() * 100) + 20;

    bar.style.height = `${randomHeight}%`;
  });

});