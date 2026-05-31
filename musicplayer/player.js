const playBtn      = document.getElementById("playBtn");
const playIcon     = document.getElementById("playIcon");
const prevBtn      = document.getElementById("prevBtn");
const nextBtn      = document.getElementById("nextBtn");
const shuffleBtn   = document.getElementById("shuffleBtn");
const repeatBtn    = document.getElementById("repeatBtn");
const likeBtn      = document.getElementById("likeBtn");
const vinylRing    = document.getElementById("vinylRing");
const albumCover   = document.getElementById("albumCover");
const progressFill = document.getElementById("progressFill");
const progressRange= document.getElementById("progressRange");
const currentTimeEl= document.getElementById("currentTime");
const volumeSlider = document.getElementById("volumeSlider");

let isPlaying  = false;
let isShuffle  = false;
let isRepeat   = false;
let isLiked    = false;

const DURATION = 225;   // seconds (3:45)
let   elapsed  = 0;
let   ticker   = null;

// Helper to format seconds as M:SS
function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function setProgress(seconds) {
  elapsed = Math.max(0, Math.min(seconds, DURATION));
  const pct = (elapsed / DURATION) * 100;
  progressFill.style.width = pct + "%";
  progressRange.value = elapsed;
  progressRange.setAttribute("aria-valuenow", elapsed);
  progressRange.setAttribute("aria-valuetext", `${formatTime(elapsed)} of ${formatTime(DURATION)}`);
  currentTimeEl.textContent = formatTime(elapsed);
}

function startTicker() {
  if (ticker) return;
  ticker = setInterval(() => {
    if (elapsed >= DURATION) {
      if (isRepeat) {
        setProgress(0);
      } else {
        pausePlayback();
        setProgress(0);
      }
      return;
    }
    setProgress(elapsed + 1);
  }, 1000);
}

function stopTicker() {
  clearInterval(ticker);
  ticker = null;
}

// Play / Pause
function startPlayback() {
  isPlaying = true;
  playIcon.className   = "fa-solid fa-pause";
  playBtn.setAttribute("aria-label", "Pause");
  vinylRing.classList.add("spinning");
  albumCover.classList.add("playing");
  startTicker();
}

function pausePlayback() {
  isPlaying = false;
  playIcon.className   = "fa-solid fa-play";
  playBtn.setAttribute("aria-label", "Play");
  vinylRing.classList.remove("spinning");
  albumCover.classList.remove("playing");
  stopTicker();
}

playBtn.addEventListener("click", () => {
  isPlaying ? pausePlayback() : startPlayback();
});

progressRange.addEventListener("input", () => {
  setProgress(Number(progressRange.value));
});

volumeSlider.addEventListener("input", () => {
  const vol = volumeSlider.value;
  volumeSlider.setAttribute("aria-valuenow", vol);
});

shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle("active", isShuffle);
  shuffleBtn.setAttribute("aria-pressed", String(isShuffle));
  shuffleBtn.setAttribute("aria-label", isShuffle ? "Shuffle on" : "Shuffle");
});

repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle("active", isRepeat);
  repeatBtn.setAttribute("aria-pressed", String(isRepeat));
  repeatBtn.setAttribute("aria-label", isRepeat ? "Repeat on" : "Repeat");
});

likeBtn.addEventListener("click", () => {
  isLiked = !isLiked;
  likeBtn.classList.toggle("liked", isLiked);
  likeBtn.setAttribute("aria-pressed", String(isLiked));
  likeBtn.setAttribute("aria-label", isLiked ? "Unlike this song" : "Like this song");
});

prevBtn.addEventListener("click", () => {
  // If more than 3 s in, restart track; otherwise go to "previous"
  if (elapsed > 3) {
    setProgress(0);
  } else {
    setProgress(0);
    if (isPlaying) startPlayback();
  }
});

nextBtn.addEventListener("click", () => {
  setProgress(0);
  if (!isPlaying) startPlayback();
});

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (["INPUT", "TEXTAREA", "BUTTON"].includes(document.activeElement.tagName)) return;

  if (e.code === "Space") {
    e.preventDefault();
    isPlaying ? pausePlayback() : startPlayback();
  } else if (e.code === "ArrowRight") {
    e.preventDefault();
    setProgress(elapsed + 10);
  } else if (e.code === "ArrowLeft") {
    e.preventDefault();
    setProgress(elapsed - 10);
  }
});