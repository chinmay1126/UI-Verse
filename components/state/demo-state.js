import StateManager from '/js/core/state-manager.js';

// Initialize counter if missing
if (StateManager.get('counter') === undefined) StateManager.set('counter', 0);

const el = document.getElementById('counter');
const inc = document.getElementById('inc');
const reset = document.getElementById('reset');

function render(v) { el.textContent = String(v ?? '—'); }

// subscribe to counter
StateManager.subscribe('counter', (v) => render(v));

inc.addEventListener('click', () => {
  const cur = StateManager.get('counter') || 0;
  StateManager.set('counter', cur + 1);
});

reset.addEventListener('click', () => StateManager.set('counter', 0));

// initial render
render(StateManager.get('counter'));
