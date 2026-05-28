const playBtn = document.getElementById("play");

let isPlaying = false;

playBtn.addEventListener("click", () => {

  if(!isPlaying){
    playBtn.textContent = "⏸";
    isPlaying = true;
  }
  else{
    playBtn.textContent = "▶";
    isPlaying = false;
  }

});

// player.js

const playBtn = document.getElementById("playBtn");

let isPlaying = false;

playBtn.addEventListener("click", () => {

  isPlaying = !isPlaying;

  if(isPlaying){

    playBtn.innerHTML =
      '<i class="fa-solid fa-pause"></i>';

  } else {

    playBtn.innerHTML =
      '<i class="fa-solid fa-play"></i>';
  }

});