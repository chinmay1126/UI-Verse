export class UVButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<button><slot></slot></button>`;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('uv-button')) {
  customElements.define('uv-button', UVButton);
}
