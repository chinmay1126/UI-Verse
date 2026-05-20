import UVElement from '/js/core/web-components-factory.js';
import ComponentRegistry from '/js/core/component-registry.js';

const template = `
  <button part="button" class="uv-button"><slot></slot></button>
`;

const styles = `
  :host { display: inline-block; }
  .uv-button {
    background: var(--uv-button-bg, #667eea);
    color: var(--uv-button-color, #fff);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

class UVButton extends UVElement {
  constructor() {
    super({ useShadow: true, template, styles });
  }

  init() {
    this._btn = this._root.querySelector('button');
    if (this.hasAttribute('disabled')) this._btn.disabled = true;
    this._btn.addEventListener('click', (e) => {
      this.dispatchEvent(new CustomEvent('uv-click', { bubbles: true, composed: true }));
    });
  }

  static get observedAttributes() { return ['disabled']; }

  onAttributeChange(name, oldVal, newVal) {
    if (name === 'disabled' && this._btn) {
      this._btn.disabled = newVal !== null;
    }
  }
}

ComponentRegistry.define('uv-button', UVButton);

// Backwards compatibility: expose to window
if (!window.UV) window.UV = {};
window.UV.UVButton = UVButton;

export default UVButton;
// Debug log to verify registration in browser
try { console.log('uv-button module loaded'); } catch(e) {}
