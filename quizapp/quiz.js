const optionButtons =
  document.querySelectorAll(".option-btn");

const scoreElement =
  document.getElementById("score");

let score = 0;

optionButtons.forEach(button => {

  button.addEventListener("click", () => {

    optionButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    if(button.textContent ===
      "Hyper Text Markup Language"){

      score = 1;
    }
    else{

      score = 0;
    }

    scoreElement.textContent = score;

  });

});

document.getElementById("nextBtn")
.addEventListener("click", () => {

  if (window.UIVERSE_DEBUG) alert("Next question feature can be extended.");

});

// quiz.js

const options = document.querySelectorAll(".option-btn");

options.forEach((btn) => {

  btn.addEventListener("click", () => {

    options.forEach((item) => {
      item.style.border = "1px solid rgba(255,255,255,0.08)";
      item.style.background = "rgba(255,255,255,0.06)";
    });

    btn.style.border = "2px solid #06b6d4";
    btn.style.background =
      "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(6,182,212,0.35))";

  });

});

let time = 30;

const timer = document.getElementById("timer");

setInterval(() => {

  if(time > 0){
    time--;
    timer.innerText = time + "s";
  }

},1000);