const timer =
  document.getElementById("timer");

const startBtn =
  document.getElementById("startBtn");

const resetBtn =
  document.getElementById("resetBtn");

let totalSeconds = 1500;
let interval = null;

function updateTimer(){

  let minutes =
    Math.floor(totalSeconds / 60);

  let seconds =
    totalSeconds % 60;

  minutes =
    minutes < 10 ? "0" + minutes : minutes;

  seconds =
    seconds < 10 ? "0" + seconds : seconds;

  timer.textContent =
    `${minutes}:${seconds}`;
}

startBtn.addEventListener("click", () => {

  if(interval){
    return;
  }

  interval = setInterval(() => {

    if(totalSeconds > 0){

      totalSeconds--;

      updateTimer();
    }
    else{

      clearInterval(interval);
    }

  }, 1000);

});

resetBtn.addEventListener("click", () => {

  clearInterval(interval);

  interval = null;

  totalSeconds = 1500;

  updateTimer();

});

const search = document.getElementById("search");
const cards = document.querySelectorAll(".file-card");

search.addEventListener("input", () => {

  const term = search.value.toLowerCase();

  cards.forEach(card => {

    const fileName =
      card.querySelector("h3")
      .textContent
      .toLowerCase();

    card.style.display =
      fileName.includes(term)
      ? "block"
      : "none";
  });

});

const timerEl = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const sessionsEl = document.getElementById("sessions");
const minutesEl = document.getElementById("minutes");
const productivityEl = document.getElementById("productivity");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const START_TIME = 25 * 60;
const DAILY_GOAL = 8;

let timeLeft = START_TIME;
let timer = null;

let sessions = 0;
let focusMinutes = 0;

function updateTimer() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  timerEl.textContent =
    `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateStats() {

  sessionsEl.textContent = sessions;

  focusMinutesEl = focusMinutes;

  minutesEl.textContent = focusMinutes;

  const productivity =
    Math.min(
      Math.round((sessions / DAILY_GOAL) * 100),
      100
    );

  productivityEl.textContent =
    `${productivity}%`;

  progressFill.style.width =
    `${productivity}%`;

  progressText.textContent =
    `${sessions} / ${DAILY_GOAL} Sessions`;
}

function startTimer() {

  if (timer) return;

  timer = setInterval(() => {

    timeLeft--;

    updateTimer();

    if (timeLeft <= 0) {

      clearInterval(timer);
      timer = null;

      sessions++;
      focusMinutes += 25;

      updateStats();

      alert("🎉 Focus session completed!");

      timeLeft = START_TIME;
      updateTimer();
    }

  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = START_TIME;
  updateTimer();
}

startBtn.addEventListener(
  "click",
  startTimer
);

pauseBtn.addEventListener(
  "click",
  pauseTimer
);

resetBtn.addEventListener(
  "click",
  resetTimer
);

updateTimer();
updateStats();