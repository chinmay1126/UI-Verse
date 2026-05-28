const commandInput = document.getElementById("commandInput");
const consoleBody = document.getElementById("consoleBody");

commandInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const command = commandInput.value.trim();

    if (command !== "") {
      const commandLine = document.createElement("p");
      commandLine.textContent = `>> ${command}`;

      const responseLine = document.createElement("p");

      switch (command.toLowerCase()) {
        case "help":
          responseLine.textContent =
            "Available commands: help, clear, status";
          break;

        case "status":
          responseLine.textContent =
            "System Status: ONLINE";
          break;

        case "clear":
          consoleBody.innerHTML = "";
          commandInput.value = "";
          return;

        default:
          responseLine.textContent =
            "Unknown command detected.";
      }

      consoleBody.appendChild(commandLine);
      consoleBody.appendChild(responseLine);

      consoleBody.scrollTop = consoleBody.scrollHeight;

      commandInput.value = "";
    }
  }
});

// script.js

const input = document.getElementById("commandInput");
const consoleBody = document.getElementById("consoleBody");

const commands = {
  help: [
    "Available commands:",
    "help - Show command list",
    "clear - Clear console",
    "about - System information",
    "time - Show current time",
    "hack - Simulate hacking",
    "status - System status"
  ],

  about: [
    "Cyberpunk Command Console v2.0",
    "Secure Neural Interface Active.",
    "Powered by Quantum Grid Engine."
  ],

  hack: [
    "Injecting exploit packets...",
    "Bypassing firewall...",
    "Decrypting neural nodes...",
    "ACCESS GRANTED ✔"
  ],

  status: [
    "System Status: ONLINE",
    "CPU Load: 18%",
    "Memory Usage: 42%",
    "Security Layer: ACTIVE"
  ]
};

function addLine(text, className = "") {
  const p = document.createElement("p");
  p.textContent = text;

  if (className) {
    p.classList.add(className);
  }

  consoleBody.appendChild(p);
  consoleBody.scrollTop = consoleBody.scrollHeight;
}

input.addEventListener("keydown", (e) => {

  if (e.key === "Enter") {

    const cmd = input.value.trim().toLowerCase();

    if (!cmd) return;

    addLine(`>> ${cmd}`);

    if (cmd === "clear") {
      consoleBody.innerHTML = "";
    }

    else if (cmd === "time") {
      addLine(new Date().toLocaleTimeString());
    }

    else if (commands[cmd]) {

      commands[cmd].forEach((line, index) => {

        setTimeout(() => {
          addLine(line);
        }, index * 300);

      });

    }

    else {
      addLine(`Command not found: ${cmd}`);
      addLine(`Type "help" for available commands.`);
    }

    input.value = "";
  }

});

/* Boot Animation */
setTimeout(() => {
  addLine("> Neural link established.");
}, 1200);

setTimeout(() => {
  addLine("> Welcome Operator.");
}, 2200);

const input = document.getElementById("commandInput");
const consoleBody = document.getElementById("consoleBody");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value.trim();

    if (command !== "") {
      const line = document.createElement("p");
      line.textContent = `> ${command}`;
      consoleBody.appendChild(line);

      input.value = "";

      consoleBody.scrollTop = consoleBody.scrollHeight;
    }
  }
});