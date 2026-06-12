export class UVTooltip extends HTMLElement {
  private _tooltipEl: HTMLElement;

  constructor() {
    super();
    const s = this.attachShadow({ mode: 'open' });
    s.innerHTML = `
      <span><slot></slot></span>
      <div class="tooltip" hidden>Tooltip text</div>
    `;
    this._tooltipEl = s.querySelector('.tooltip') as HTMLElement;

    if (typeof CSSStyleSheet !== 'undefined') {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`
        .tooltip {
          position: absolute;
          background: #333;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 100;
        }
        .tooltip[hidden] {
          display: none;
        }
      `);
      s.adoptedStyleSheets = [sheet];
    } else {
      const style = document.createElement('style');
      style.textContent = `
        .tooltip {
          position: absolute;
          background: #333;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          z-index: 100;
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

