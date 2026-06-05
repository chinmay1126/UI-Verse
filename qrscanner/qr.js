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

const scanBtn = document.getElementById("scanBtn");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const video = document.getElementById("qr-video");
const status = document.getElementById("scanStatus");

let stream = null;

scanBtn.addEventListener("click", startScanner);

async function startScanner() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment"
      }
    });

    video.srcObject = stream;
    status.textContent = "Scanning...";

    requestAnimationFrame(scanFrame);

  } catch (error) {
    status.textContent = "Camera access denied";
    console.error(error);
  }
}

function scanFrame() {
  if (!video.videoWidth) {
    requestAnimationFrame(scanFrame);
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const code = jsQR(
    imageData.data,
    imageData.width,
    imageData.height
  );

  if (code) {
    status.textContent = `QR Found: ${code.data}`;

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    return;
  }

  requestAnimationFrame(scanFrame);
}

uploadBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", event => {
  const file = event.target.files[0];

  if (!file) return;

  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const code = jsQR(
      imageData.data,
      imageData.width,
      imageData.height
    );

    if (code) {
      status.textContent = `QR Found: ${code.data}`;
    } else {
      status.textContent = "No QR code detected";
    }
  };

  img.src = URL.createObjectURL(file);
});