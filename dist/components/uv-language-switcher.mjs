export class UVLanguageSwitcher extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<select><option>en</option><option>es</option></select>`;
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('uv-language-switcher')) {
  customElements.define('uv-language-switcher', UVLanguageSwitcher);
}
