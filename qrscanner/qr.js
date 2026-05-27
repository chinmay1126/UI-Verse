const scanBtn = document.getElementById("scanBtn");

scanBtn.addEventListener("click", () => {

  if(scanBtn.textContent === "Start Scan"){

    scanBtn.textContent = "Scanning...";
  }
  else{

    scanBtn.textContent = "Start Scan";
  }

});

// qr.js

const scanBtn = document.getElementById("scanBtn");
const uploadBtn = document.getElementById("uploadBtn");
const scanStatus = document.querySelector(".scan-status");
const scanLine = document.querySelector(".scan-line");

let scanning = false;

// Start Scan Button

scanBtn.addEventListener("click", () => {

  scanning = !scanning;

  if (scanning) {

    scanBtn.innerHTML = "Stop Scan";

    scanStatus.innerHTML = "Scanning QR Code...";

    scanLine.style.animation = "scan 1.8s linear infinite";

    simulateDetection();

  } else {

    stopScanner();

  }

});

// Upload Button

uploadBtn.addEventListener("click", () => {

  scanStatus.innerHTML = "Uploading QR Image...";

  uploadBtn.innerHTML = "Uploading...";

  setTimeout(() => {

    uploadBtn.innerHTML = "Upload QR";

    scanStatus.innerHTML = "QR Image Ready";

  }, 2000);

});

// Fake Detection Animation

function simulateDetection() {

  setTimeout(() => {

    if (scanning) {

      scanStatus.innerHTML = "QR Code Detected ✓";

      navigator.vibrate?.(150);

      scanSuccessEffect();

    }

  }, 3500);

}

// Stop Scanner

function stopScanner() {

  scanning = false;

  scanBtn.innerHTML = "Start Scan";

  scanStatus.innerHTML = "Ready to Scan";

  scanLine.style.animation = "none";

}

// Success Effect

function scanSuccessEffect() {

  const scannerBox = document.querySelector(".scanner-box");

  scannerBox.style.boxShadow =
    "0 0 60px rgba(0,255,170,0.55)";

  setTimeout(() => {

    scannerBox.style.boxShadow =
      "0 0 40px rgba(0,240,255,0.2), inset 0 0 40px rgba(255,255,255,0.05)";

  }, 1500);

}