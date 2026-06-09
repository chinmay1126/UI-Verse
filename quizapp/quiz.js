const optionButtons = document.querySelectorAll(".option-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let score = 0;
let time = 30;

// Handle Option Clicks
optionButtons.forEach(button => {
  button.addEventListener("click", () => {
    
    // Remove active class from all buttons
    optionButtons.forEach(btn => btn.classList.remove("active"));
    
    // Add active class to the selected button
    button.classList.add("active");

    // Check answer and update score
    if(button.textContent.includes("Hyper Text Markup Language")) {
      score = 1;
    } else {
      score = 0;
    }
    
    scoreElement.textContent = score;
  });
});

// Handle Next Button
document.getElementById("nextBtn").addEventListener("click", () => {
  if (window.UIVERSE_DEBUG) {
    alert("Next question feature can be extended.");
  }
});

// Timer Logic
setInterval(() => {
  if(time > 0){
    time--;
    timerElement.innerText = time + "s";
  }
}, 1000);