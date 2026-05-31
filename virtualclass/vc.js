const sendBtn =
  document.getElementById("sendBtn");

const chatInput =
  document.getElementById("chatInput");

const messages =
  document.getElementById("messages");

if (!sendBtn || !chatInput || !messages) {
  // Page does not include the virtual class chat widget.
} else {
  sendBtn.addEventListener("click", () => {

  const text = chatInput.value.trim();

  if(text === ""){
    return;
  }

  const message =
    document.createElement("div");

  message.classList.add("message");
  message.classList.add("student");

  message.textContent =
    `You: ${text}`;

  messages.appendChild(message);

  chatInput.value = "";

    messages.scrollTop =
      messages.scrollHeight;

  });
}

// vc.js

const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const messages = document.getElementById("messages");

const micBtn = document.getElementById("micBtn");
const camBtn = document.getElementById("camBtn");

let micOn = true;
let camOn = true;

/* Send Chat Message */

function sendMessage() {

  const text = chatInput.value.trim();

  if(text === "") return;

  const newMessage = document.createElement("div");

  newMessage.classList.add("message", "student");

  newMessage.textContent = `You: ${text}`;

  messages.appendChild(newMessage);

  messages.scrollTop = messages.scrollHeight;

  chatInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", (e) => {

  if(e.key === "Enter"){
    sendMessage();
  }

});

/* Mic Toggle */

micBtn.addEventListener("click", () => {

  micOn = !micOn;

  micBtn.textContent = micOn ? "🎤" : "🔇";

  micBtn.style.background =
    micOn ? "#1e293b" : "#ef4444";

});

/* Camera Toggle */

camBtn.addEventListener("click", () => {

  camOn = !camOn;

  camBtn.textContent = camOn ? "📹" : "📷";

  camBtn.style.background =
    camOn ? "#1e293b" : "#ef4444";

});