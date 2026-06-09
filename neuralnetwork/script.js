// script.js

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let progress = 65;

setInterval(() => {

  if(progress < 100){
    progress++;
  } else {
    progress = 65;
  }

  progressBar.style.width = progress + "%";
  progressText.textContent = progress + "%";

}, 1000);
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// Select nodes + lines
const nodes = document.querySelectorAll(".node");
const lines = document.querySelectorAll(".connections line");

// Simulate training progress
let progress = 0;

function updateProgress() {
  progress += 1;

  if (progress > 100) progress = 0;

  progressBar.style.width = progress + "%";
  progressText.innerText = progress + "%";

  requestAnimationFrame(updateProgress);
}

updateProgress();


// Neural pulse animation
function animateNetwork() {
  // reset styles
  nodes.forEach(n => n.classList.remove("active"));
  lines.forEach(l => l.classList.remove("active-line"));

  // randomly activate nodes
  const activeNodes = [];

  for (let i = 0; i < 5; i++) {
    const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
    activeNodes.push(randomNode);
  }

  activeNodes.forEach(node => node.classList.add("active"));

  // randomly activate lines
  lines.forEach(line => {
    if (Math.random() > 0.6) {
      line.classList.add("active-line");
    }
  });

  setTimeout(animateNetwork, 700);
}

animateNetwork();