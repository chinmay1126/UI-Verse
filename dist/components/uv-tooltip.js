export class UVTooltip extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<span><slot></slot></span>`;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('uv-tooltip')) {
  customElements.define('uv-tooltip', UVTooltip);
}
