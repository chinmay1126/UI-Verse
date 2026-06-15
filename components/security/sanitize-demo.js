import { sanitize } from '/js/core/sanitizer.js';

const payload = document.getElementById('payload');
const out = document.getElementById('output');
const btn = document.getElementById('render');

async function render() {
  const raw = payload.value;
  const clean = sanitize(raw);
  out.innerHTML = clean;
}

btn.addEventListener('click', render);
// initial render
render();
