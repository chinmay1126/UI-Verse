export class UVModal extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<div><slot></slot></div>`;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('uv-modal')) {
  customElements.define('uv-modal', UVModal);
}
