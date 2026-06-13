class UVTooltip extends HTMLElement {
    constructor() {
        super();
        const s = this.attachShadow({ mode: 'open' });
        s.innerHTML = `
      <span><slot></slot></span>
      <div class="tooltip" hidden>Tooltip text</div>
    `;
        this._tooltipEl = s.querySelector('.tooltip');
        if (typeof CSSStyleSheet !== 'undefined') {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(`
        .tooltip {
          position: absolute;
          background: var(--surface-elevated, #333);
          color: var(--text-primary, #fff);
          padding: 4px 8px;
          border-radius: var(--radius-sm, 4px);
          font-size: 12px;
          z-index: 100;
          border: 1px solid var(--border-primary, #ebebeb);
          box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.06));
          font-family: var(--font-body, inherit);
        }
        .tooltip[hidden] {
          display: none;
        }
      `);
            s.adoptedStyleSheets = [sheet];
        }
        else {
            const style = document.createElement('style');
            style.textContent = `
        .tooltip {
          position: absolute;
          background: var(--surface-elevated, #333);
          color: var(--text-primary, #fff);
          padding: 4px 8px;
          border-radius: var(--radius-sm, 4px);
          font-size: 12px;
          z-index: 100;
          border: 1px solid var(--border-primary, #ebebeb);
          box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.06));
          font-family: var(--font-body, inherit);
        }
        .tooltip[hidden] {
          display: none;
        }
      `;
            s.appendChild(style);
        }
    }
    show() {
        this._tooltipEl.removeAttribute('hidden');
    }
    hide() {
        this._tooltipEl.setAttribute('hidden', '');
    }
}
if (typeof customElements !== 'undefined' && !customElements.get('uv-tooltip')) {
    customElements.define('uv-tooltip', UVTooltip);
}

export { UVTooltip };
//# sourceMappingURL=uv-tooltip.js.map
