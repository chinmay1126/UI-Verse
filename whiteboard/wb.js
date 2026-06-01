const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBtn = document.getElementById("clearBtn");
const eraserBtn = document.getElementById("eraserBtn");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let drawing = false;
let currentColor = "#000000";

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

colorPicker.addEventListener("input", e => {
  currentColor = e.target.value;
});

canvas.addEventListener("mousedown", () => { drawing = true; });
canvas.addEventListener("mouseup", () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

eraserBtn.addEventListener("click", () => {
  currentColor = "#ffffff";
});

let selectedFormat = "png";

function saveCanvas() {
  const mimeType = selectedFormat === "jpg" ? "image/jpeg" : "image/png";
  const quality  = selectedFormat === "jpg" ? 0.95 : undefined;
  const dataURL  = canvas.toDataURL(mimeType, quality);
  const link     = document.createElement("a");
  link.href      = dataURL;
  link.download  = `drawing.${selectedFormat}`;
  link.click();
}

function injectSaveControls() {
  const toolbar = clearBtn?.parentElement || document.body;

  // Wrapper
  const wrapper = document.createElement("div");
  wrapper.id = "saveWrapper";

  // Main save button
  const saveBtn = document.createElement("button");
  saveBtn.id = "saveBtn";
  saveBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    <span id="saveBtnLabel">Save PNG</span>
  `;
  saveBtn.addEventListener("click", saveCanvas);

  // Divider
  const divider = document.createElement("div");
  divider.id = "saveDivider";

  // Chevron toggle
  const chevronBtn = document.createElement("button");
  chevronBtn.id = "saveChevron";
  chevronBtn.setAttribute("aria-label", "Choose format");
  chevronBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  `;

  // Dropdown menu
  const menu = document.createElement("div");
  menu.id = "saveMenu";
  menu.innerHTML = `
    <div class="save-option active" data-format="png">
      <span class="save-option-check">✓</span> PNG
      <small>lossless</small>
    </div>
    <div class="save-option" data-format="jpg">
      <span class="save-option-check"></span> JPG
      <small>smaller file</small>
    </div>
  `;

  // Option click
  menu.querySelectorAll(".save-option").forEach(opt => {
    opt.addEventListener("click", () => {
      selectedFormat = opt.dataset.format;
      document.getElementById("saveBtnLabel").textContent = `Save ${selectedFormat.toUpperCase()}`;
      menu.querySelectorAll(".save-option").forEach(o => {
        o.classList.remove("active");
        o.querySelector(".save-option-check").textContent = "";
      });
      opt.classList.add("active");
      opt.querySelector(".save-option-check").textContent = "✓";
      menu.classList.remove("open");
    });
  });

  // Chevron toggles menu
  chevronBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });

  // Close on outside click
  document.addEventListener("click", () => menu.classList.remove("open"));

  wrapper.appendChild(saveBtn);
  wrapper.appendChild(divider);
  wrapper.appendChild(chevronBtn);
  wrapper.appendChild(menu);
  toolbar.appendChild(wrapper);
}

if (document.readyState !== "loading") {
  injectSaveControls();
} else {
  document.addEventListener("DOMContentLoaded", injectSaveControls);
}