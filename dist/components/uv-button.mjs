class UVButton extends HTMLElement {
    constructor() {
        super();
        const s = this.attachShadow({ mode: 'open' });
        s.innerHTML = `<button><slot></slot></button>`;
    }
}
if (typeof customElements !== 'undefined' && !customElements.get('uv-button')) {
    customElements.define('uv-button', UVButton);
}

export { UVButton };
//# sourceMappingURL=uv-button.mjs.map
