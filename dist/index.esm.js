class UVSample extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const root = document.createElement('div');
        root.textContent = 'UV-Sample component';
        shadow.appendChild(root);
    }
}
function registerComponents() {
    if (typeof customElements !== 'undefined' && !customElements.get('uv-sample')) {
        customElements.define('uv-sample', UVSample);
    }
}
// Auto-register for convenience in browser builds
if (typeof window !== 'undefined') {
    registerComponents();
}

export { UVSample as default, registerComponents };
//# sourceMappingURL=index.esm.js.map
