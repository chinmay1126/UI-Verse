/* ELEMENTS */

const paletteOverlay =
document.getElementById(
"paletteOverlay"
);


const openBtn =
document.getElementById(
"openPaletteBtn"
);

const commandInput =
document.getElementById(
"commandInput"
);

const commandItems =
document.querySelectorAll(
".command-item"
);

/* OPEN */

function openPalette(){

  paletteOverlay.classList.add(
    "active"
  );

  commandInput.focus();
}

/* CLOSE */

function closePalette(){

  paletteOverlay.classList.remove(
    "active"
  );
}

/* BUTTON */

openBtn.addEventListener(
"click",
openPalette
);

/* SHORTCUT */

document.addEventListener(
"keydown",
(e) => {

  const key =
  e.key.toLowerCase();

  /* CMD + K */

  if(
    (e.metaKey || e.ctrlKey)
    &&
    key === "k"
  ){

    e.preventDefault();

    openPalette();
  }

  /* ESC */

  if(key === "escape"){

    closePalette();
  }

});

/* CLOSE OUTSIDE */

paletteOverlay.addEventListener(
"click",
(e) => {

  if(
    e.target === paletteOverlay
  ){

    closePalette();
  }

});

/* FILTER COMMANDS */

commandInput.addEventListener(
"input",
() => {

  const value =
  commandInput.value
  .toLowerCase();

  commandItems.forEach(item => {

    const text =
    item.innerText.toLowerCase();

    if(text.includes(value)){

      item.style.display =
      "flex";

    }

    else{

      item.style.display =
      "none";
    }

  });

});

/* COMMAND ACTION */

commandItems.forEach(item => {

  item.addEventListener(
  "click",
  () => {

    const text =
    item.innerText;

    alert(
      "⚡ Executed: " +
      text
    );

    closePalette();
  });

});


<script>
const commandInput = document.getElementById("commandInput");
const commandItems = Array.from(document.querySelectorAll(".command-item"));
const overlay = document.getElementById("paletteOverlay");
const openBtn = document.getElementById("openPaletteBtn");

let activeIndex = 0;

/* ================= OPEN PALETTE ================= */
function openPalette(){
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  setTimeout(() => commandInput.focus(), 50);
  setActive(0);
}

function closePalette(){
  overlay.classList.remove("active");
  document.body.style.overflow = "";
  commandInput.value = "";
  resetFilter();
}

/* ================= ACTIVE ITEM HANDLING ================= */
function setActive(index){
  commandItems.forEach((item,i)=>{
    item.classList.toggle("active", i === index && item.style.display !== "none");
  });
  activeIndex = index;
  scrollIntoView();
}

function getVisibleItems(){
  return commandItems.filter(item => item.style.display !== "none");
}

function scrollIntoView(){
  const visible = getVisibleItems();
  const el = visible[activeIndex];
  if(el){
    el.scrollIntoView({block:"nearest"});
  }
}

/* ================= SEARCH (DEBOUNCED) ================= */
let debounceTimer;

function filterCommands(value){
  let hasAny = false;

  commandItems.forEach(item=>{
    const text = item.innerText.toLowerCase();
    const match = text.includes(value);

    item.style.display = match ? "flex" : "none";
    if(match) hasAny = true;
  });

  activeIndex = 0;
  setActive(0);

  if(!hasAny){
    showNoResults();
  } else {
    removeNoResults();
  }
}

function showNoResults(){
  if(document.querySelector(".no-results")) return;

  const div = document.createElement("div");
  div.className = "no-results";
  div.textContent = "No commands found";
  document.getElementById("commandList").appendChild(div);
}

function removeNoResults(){
  const el = document.querySelector(".no-results");
  if(el) el.remove();
}

/* ================= EVENTS ================= */
commandInput.addEventListener("input", (e)=>{
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(()=>{
    filterCommands(e.target.value.toLowerCase());
  }, 80);
});

/* ================= KEYBOARD NAVIGATION ================= */
document.addEventListener("keydown", (e)=>{

  const isOpen = overlay.classList.contains("active");

  /* OPEN (Cmd/Ctrl + K) */
  if((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k"){
    e.preventDefault();
    isOpen ? closePalette() : openPalette();
  }

  if(!isOpen) return;

  const visible = getVisibleItems();

  if(e.key === "ArrowDown"){
    e.preventDefault();
    activeIndex = (activeIndex + 1) % visible.length;
    setActive(activeIndex);
  }

  if(e.key === "ArrowUp"){
    e.preventDefault();
    activeIndex = (activeIndex - 1 + visible.length) % visible.length;
    setActive(activeIndex);
  }

  if(e.key === "Enter"){
    e.preventDefault();
    visible[activeIndex]?.click();
  }

  if(e.key === "Escape"){
    closePalette();
  }
});

/* ================= OPEN BUTTON ================= */
openBtn.onclick = openPalette;

/* ================= OUTSIDE CLICK ================= */
overlay.addEventListener("click", (e)=>{
  if(e.target === overlay){
    closePalette();
  }
});

/* ================= COMMAND CLICK ================= */
commandItems.forEach((item, index)=>{
  item.addEventListener("click", ()=>{
    alert(item.innerText.trim());
    closePalette();
  });
});
