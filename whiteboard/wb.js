const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const clearBtn = document.getElementById("clearBtn");
const brushBtn = document.getElementById("brushBtn");
const eraserBtn = document.getElementById("eraserBtn");
const fillBtn = document.getElementById("fillBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const shapeBtn = document.getElementById("shapeBtn");
const shapeBtnIcon = document.getElementById("shapeBtnIcon");
const shapePopover = document.getElementById("shapePopover");
const shapePickerWrapper = document.getElementById("shapePickerWrapper");

const lineBtn    = document.createElement("button");
const rectBtn    = document.createElement("button");
const ellipseBtn = document.createElement("button");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let drawing = false;
let currentColor = "#000000";

// Shape state
let shapeStartX = 0, shapeStartY = 0;
let shapeSnapshot = null;

const SHAPE_TOOLS = [lineBtn, rectBtn, ellipseBtn];
const isShapeTool = () => SHAPE_TOOLS.some(b => b.classList.contains("active"));

//  History 
let history = [];
let historyIndex = -1;

function saveSnapshot() {
  history = history.slice(0, historyIndex + 1);
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  historyIndex++;
}

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
saveSnapshot();

//  Tool activation 
function setActiveTool(tool) {
  [brushBtn, eraserBtn, fillBtn].forEach(b => {
    b.classList.remove("active", "just-activated");
    b.setAttribute("aria-pressed", "false");
  });
  SHAPE_TOOLS.forEach(b => b.classList.remove("active"));

  if (!SHAPE_TOOLS.includes(tool)) {
    shapeBtn.classList.remove("active");
    shapeBtn.setAttribute("aria-pressed", "false");
  }

  if (SHAPE_TOOLS.includes(tool)) {
    // Activate the virtual node
    tool.classList.add("active");
    // Highlight the shape trigger button
    shapeBtn.classList.add("active");
    shapeBtn.setAttribute("aria-pressed", "true");
  } else {
    tool.classList.add("active");
    tool.setAttribute("aria-pressed", "true");
    void tool.offsetWidth;
    tool.classList.add("just-activated");
  }

  canvas.classList.toggle("fill-mode", tool === fillBtn);
}

// Canvas mouse events 
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  if (isShapeTool()) {
    shapeStartX = e.offsetX;
    shapeStartY = e.offsetY;
    shapeSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
});

canvas.addEventListener("mouseup", (e) => {
  if (!drawing) return;
  if (isShapeTool()) {
    ctx.putImageData(shapeSnapshot, 0, 0);
    drawShape(e.offsetX, e.offsetY, false);
  }
  drawing = false;
  ctx.beginPath();
  saveSnapshot();
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  if (isShapeTool()) {
    // Ghost preview
    ctx.putImageData(shapeSnapshot, 0, 0);
    drawShape(e.offsetX, e.offsetY, true);
    return;
  }
  drawFreehand(e);
});

canvas.addEventListener("click", (e) => {
  if (!fillBtn.classList.contains("active")) return;
  floodFill(e.offsetX, e.offsetY, currentColor);
  saveSnapshot();
});

// Drawing functions 
function drawFreehand(e) {
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function drawShape(ex, ey, isGhost) {
  ctx.save();
  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = currentColor;
  if (isGhost) ctx.globalAlpha = 0.55;

  const x = Math.min(shapeStartX, ex);
  const y = Math.min(shapeStartY, ey);
  const w = Math.abs(ex - shapeStartX);
  const h = Math.abs(ey - shapeStartY);

  ctx.beginPath();
  if (lineBtn.classList.contains("active")) {
    ctx.moveTo(shapeStartX, shapeStartY);
    ctx.lineTo(ex, ey);
  } else if (rectBtn.classList.contains("active")) {
    ctx.rect(x, y, w, h);
  } else if (ellipseBtn.classList.contains("active")) {
    if (w === 0 || h === 0) { ctx.restore(); return; } // nothing to draw
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
  }
  ctx.stroke();
  ctx.restore();
}

// Toolbar button listeners 
colorPicker.addEventListener("input", e => {
  currentColor = e.target.value;
  if (eraserBtn.classList.contains("active")) {
    setActiveTool(brushBtn);
  }
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  saveSnapshot();
});

brushBtn.addEventListener("click", () => {
  currentColor = colorPicker.value;
  setActiveTool(brushBtn);
});

eraserBtn.addEventListener("click", () => {
  currentColor = "#ffffff";
  setActiveTool(eraserBtn);
});

fillBtn.addEventListener("click", () => {
  setActiveTool(fillBtn);
});

// Shape popover 
shapeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = shapePopover.classList.toggle("open");
  shapeBtn.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", (e) => {
  if (!shapePickerWrapper.contains(e.target)) {
    shapePopover.classList.remove("open");
    shapeBtn.setAttribute("aria-expanded", "false");
  }
});

const shapeIconMap = {
  line:    "fa-solid fa-minus",
  rect:    "fa-regular fa-square",
  ellipse: "fa-regular fa-circle",
};

const shapeBtnMap = { line: lineBtn, rect: rectBtn, ellipse: ellipseBtn };

document.querySelectorAll(".shape-opt").forEach(opt => {
  opt.addEventListener("click", () => {
    const shape = opt.dataset.shape;

    shapeBtnIcon.className = shapeIconMap[shape];

    document.querySelectorAll(".shape-opt").forEach(o => o.classList.remove("active"));
    opt.classList.add("active");

    shapePopover.classList.remove("open");
    shapeBtn.setAttribute("aria-expanded", "false");

    currentColor = colorPicker.value;
    setActiveTool(shapeBtnMap[shape]);
  });
});

//  Undo / Redo 
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

function undo() {
  if (historyIndex <= 0) return;
  historyIndex--;
  ctx.putImageData(history[historyIndex], 0, 0);
}

function redo() {
  if (historyIndex >= history.length - 1) return;
  historyIndex++;
  ctx.putImageData(history[historyIndex], 0, 0);
}

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
  if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) { e.preventDefault(); redo(); }
});

//  Save controls (injected) 
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

function floodFill(startX, startY, fillColor) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const idx = (Math.floor(startY) * canvas.width + Math.floor(startX)) * 4;
  const target = [data[idx], data[idx+1], data[idx+2], data[idx+3]];

  const tmp = document.createElement("canvas");
  tmp.width = tmp.height = 1;
  const tmpCtx = tmp.getContext("2d");
  tmpCtx.fillStyle = fillColor;
  tmpCtx.fillRect(0, 0, 1, 1);
  const [fr, fg, fb, fa] = tmpCtx.getImageData(0, 0, 1, 1).data;

  if (target[0]===fr && target[1]===fg && target[2]===fb && target[3]===fa) return;

  const match = (i) =>
    data[i]===target[0] && data[i+1]===target[1] &&
    data[i+2]===target[2] && data[i+3]===target[3];

  const stack = [Math.floor(startX) + Math.floor(startY) * canvas.width];
  const visited = new Uint8Array(canvas.width * canvas.height);

  while (stack.length) {
    const pos = stack.pop();
    if (visited[pos]) continue;
    visited[pos] = 1;
    const i = pos * 4;
    if (!match(i)) continue;
    data[i] = fr; data[i+1] = fg; data[i+2] = fb; data[i+3] = fa;
    const x = pos % canvas.width, y = Math.floor(pos / canvas.width);
    if (x > 0)               stack.push(pos - 1);
    if (x < canvas.width-1)  stack.push(pos + 1);
    if (y > 0)               stack.push(pos - canvas.width);
    if (y < canvas.height-1) stack.push(pos + canvas.width);
  }

  ctx.putImageData(imageData, 0, 0);
}

function injectSaveControls() {
  const toolbar = clearBtn?.parentElement || document.body;
  const wrapper = document.createElement("div");
  wrapper.id = "saveWrapper";

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

  const divider = document.createElement("div");
  divider.id = "saveDivider";

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

  const menu = document.createElement("div");
  menu.id = "saveMenu";
  menu.innerHTML = `
    <div class="save-option active" data-format="png">
      <span class="save-option-check">✓</span> PNG <small>lossless</small>
    </div>
    <div class="save-option" data-format="jpg">
      <span class="save-option-check"></span> JPG <small>smaller file</small>
    </div>
  `;

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

  chevronBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("open");
  });

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