export class UVModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: var(--bg-panel, #fff);
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          max-width: 500px;
          width: 100%;
          position: relative;
        }
      </style>
      <div class="modal-overlay" role="dialog" aria-modal="true">
        <div class="modal-content" tabindex="-1">
          <slot></slot>
        </div>
      </div>
    `;
    this.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.dispatchEvent(new CustomEvent('close'));
    }
  }
}
if (!customElements.get('uv-modal')) {
  customElements.define('uv-modal', UVModal);
}
