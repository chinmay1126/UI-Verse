export class UVDropdown extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <slot name="trigger"></slot>
      <slot name="content"></slot>
    `;

    if (typeof CSSStyleSheet !== 'undefined') {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`
        :host {
          display: inline-block;
          position: relative;
        }
        ::slotted([slot="trigger"]) {
          cursor: pointer;
        }
        ::slotted([slot="content"]) {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 10;
          min-width: 160px;
          margin-top: 4px;
        }
        :host([open]) ::slotted([slot="content"]) {
          display: block;
        }
      `);
      shadow.adoptedStyleSheets = [sheet];
    } else {
      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: inline-block;
          position: relative;
        }
        ::slotted([slot="trigger"]) {
          cursor: pointer;
        }
        ::slotted([slot="content"]) {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 10;
          min-width: 160px;
          margin-top: 4px;
        }
        :host([open]) ::slotted([slot="content"]) {
          display: block;
        }
      `;
      shadow.appendChild(style);
    }
  }

  static get observedAttributes() {
    return ['open'];
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }

  set open(val: boolean) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  connectedCallback() {
    const triggerSlot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null;
    triggerSlot?.addEventListener('click', this.toggle.bind(this));
    document.addEventListener('click', this.closeOutside.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.closeOutside.bind(this));
  }

  toggle(e: Event) {
    e.stopPropagation();
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('uiverse:dropdown-toggle', { detail: { open: this.open }, bubbles: true }));
  }

  closeOutside(e: Event) {
    if (!this.contains(e.target as Node)) {
      this.open = false;
    }
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('uv-dropdown')) {
  customElements.define('uv-dropdown', UVDropdown);
}
