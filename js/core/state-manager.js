// Lightweight global state manager for components
const state = {};
const subs = new Map(); // key -> Set of callbacks

function get(path) {
  if (!path) return deepClone(state);
  return path.split('.').reduce((o, k) => (o ? o[k] : undefined), state);
}

function set(path, value) {
  if (!path) throw new Error('StateManager.set requires a path');
  const parts = path.split('.');
  let cur = state;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur[p] === undefined) cur[p] = {};
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
  notify(path, value);
}

function subscribe(path, callback) {
  if (!subs.has(path)) subs.set(path, new Set());
  subs.get(path).add(callback);
  // return unsubscribe
  return () => subs.get(path).delete(callback);
}

function notify(path, value) {
  // notify exact path subscribers
  const set_ = subs.get(path);
  if (set_) set_.forEach((cb) => cb(value));
  // notify wildcard subscribers (top-level)
  const parts = path.split('.');
  for (let i = parts.length - 1; i > 0; i--) {
    const parent = parts.slice(0, i).join('.');
    const pset = subs.get(parent);
    if (pset) pset.forEach((cb) => cb(get(parent)));
  }
}

function reset() {
  Object.keys(state).forEach((k) => delete state[k]);
  subs.forEach((set) => set.forEach((cb) => cb(undefined)));
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const StateManager = { get, set, subscribe, reset };
if (typeof window !== 'undefined') window.StateManager = StateManager;
if (typeof module !== 'undefined' && module.exports) module.exports = StateManager;
export default StateManager;
