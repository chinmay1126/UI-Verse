const micBtn =
  document.getElementById("micBtn");

const status =
  document.getElementById("status");

const inputText =
  document.getElementById("inputText");

const translatedText =
  document.getElementById("translatedText");

let listening = false;

if (micBtn) {
  micBtn.addEventListener("click", () => {

    listening = !listening;

    if(listening){

      micBtn.classList.add("active");

      if (status) {
        status.textContent =
          "Listening...";
      }

      if (inputText) {
        inputText.textContent =
          "Good morning";
      }

      if (translatedText) {
        translatedText.textContent =
          "सुप्रभात";
      }

    } else {

      micBtn.classList.remove("active");

      if (status) {
        status.textContent =
          "Tap microphone to start speaking";
      }

    }

});

// voice.js

const micBtn = document.getElementById("micBtn");
const statusText = document.getElementById("status");

const inputText = document.getElementById("inputText");
const translatedText = document.getElementById("translatedText");

let listening = false;

micBtn.addEventListener("click", () => {

  listening = !listening;

  if(listening){

    statusText.innerText = "Listening... Speak now";

    micBtn.style.transform = "scale(1.1)";

    micBtn.style.boxShadow =
      "0 0 60px rgba(6,182,212,0.9)";

    inputText.innerText =
      "Hello, can you translate this sentence?";

    translatedText.innerText =
      "नमस्ते, क्या आप इस वाक्य का अनुवाद कर सकते हैं?";

  }

  else{

    statusText.innerText =
      "Tap microphone to start speaking";

    micBtn.style.transform = "scale(1)";

    micBtn.style.boxShadow =
      "0 0 40px rgba(124,58,237,0.6)";
  }

});
  });
}
