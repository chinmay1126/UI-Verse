import UVElement from '/js/core/web-components-factory.js';
import ComponentRegistry from '/js/core/component-registry.js';
import I18n from '/js/features/i18n.js';

const template = `
  <label class="label"><span class="label-text" data-i18n="language_label">Language</span>:</label>
  <select class="lang-select" aria-label="language-select">
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="fr">Français</option>
    <option value="de">Deutsch</option>
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
    <option value="hi">हिन्दी</option>
  </select>
`;

const styles = `
  :host { display: inline-flex; align-items: center; gap: 8px; }
  select { padding: 4px 8px; }
`;

class UVLanguageSwitcher extends UVElement {
  constructor() { super({ useShadow: true, template, styles }); }

  init() {
    this.select = this._root.querySelector('.lang-select');
    // Set current selection from I18n or localStorage
    const cur = (I18n && I18n.current) || localStorage.getItem('uv_lang') || 'en';
    this.select.value = cur;
    this.select.addEventListener('change', async (e) => {
      const lang = e.target.value;
      await I18n.applyLanguage(lang);
      // update select label text if needed
    });
  }
}

ComponentRegistry.define('uv-language-switcher', UVLanguageSwitcher);
if (!window.UV) window.UV = {};
window.UV.UVLanguageSwitcher = UVLanguageSwitcher;

export default UVLanguageSwitcher;
