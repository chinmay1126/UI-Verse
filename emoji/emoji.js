const emojis = document.querySelectorAll(".emoji");
const selectedEmoji = document.getElementById("selectedEmoji");

emojis.forEach(emoji => {

  emoji.addEventListener("click", () => {

    selectedEmoji.innerText = emoji.innerText;

  });

});

// emoji.js

const emojis = document.querySelectorAll(".emoji");
const selectedEmoji = document.getElementById("selectedEmoji");
const reactionText = document.getElementById("reactionText");

const emojiLabels = {
  "😀": "Happy Mood",
  "😍": "In Love",
  "😂": "Laughing Hard",
  "😎": "Cool Vibes",
  "🔥": "On Fire",
  "👍": "Approved",
  "🎉": "Celebration Time",
  "🤯": "Mind Blown"
};

emojis.forEach((emojiBtn) => {

  emojiBtn.addEventListener("click", () => {

    // REMOVE ACTIVE
    emojis.forEach(btn => btn.classList.remove("active"));

    // ADD ACTIVE
    emojiBtn.classList.add("active");

    // GET EMOJI
    const emoji = emojiBtn.innerText;

    // UPDATE PREVIEW
    selectedEmoji.innerText = emoji;

    // UPDATE TEXT
    reactionText.innerText = emojiLabels[emoji];

    // POP EFFECT
    selectedEmoji.style.transform = "scale(1.3)";

    setTimeout(() => {
      selectedEmoji.style.transform = "scale(1)";
    }, 200);

  });

});