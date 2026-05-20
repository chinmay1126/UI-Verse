import UVElement from '/js/core/web-components-factory.js';
import ComponentRegistry from '/js/core/component-registry.js';

const template = `
  <div class="overlay" part="overlay" hidden>
    <div class="dialog" role="dialog" aria-modal="true">
      <button class="close" aria-label="Close">✕</button>
      <div class="content"><slot></slot></div>
    </div>
  </div>
`;

const styles = `
  :host { position: relative; display: block; }
  .overlay {
    position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.5);
  }
  .dialog { background: #fff; padding: 1.25rem; border-radius: 8px; min-width: 280px; max-width: 90%; }
  .close { position: absolute; right: 12px; top: 12px; border: none; background: transparent; font-size: 1.1rem; cursor: pointer; }
`;

class UVModal extends UVElement {
  constructor() {
    super({ useShadow: true, template, styles });
  }

  init() {
    this.overlay = this._root.querySelector('.overlay');
    this.closeBtn = this._root.querySelector('.close');
    this.closeBtn.addEventListener('click', () => this.close());
    this.opened = false;
  }

  open() {
    this.overlay.hidden = false;
    this.opened = true;
    this.dispatchEvent(new CustomEvent('uv-open', { bubbles: true }));
  }

  close() {
    this.overlay.hidden = true;
    this.opened = false;
    this.dispatchEvent(new CustomEvent('uv-close', { bubbles: true }));
  }
}

ComponentRegistry.define('uv-modal', UVModal);
if (!window.UV) window.UV = {};
window.UV.UVModal = UVModal;

export default UVModal;
try { console.log('uv-modal module loaded'); } catch(e) {}
