export { DesignTokens } from './design-tokens.js';
export { UVButton } from './components/uv-button.js';
export { UVModal } from './components/uv-modal.js';
export { UVTooltip } from './components/uv-tooltip.js';
export { UVLanguageSwitcher } from './components/uv-language-switcher.js';
export { UVThemeSwitcher } from './components/uv-theme-switcher.js';

export function registerUIVerseComponents() {
  return {
    button: customElements.get('uv-button'),
    modal: customElements.get('uv-modal'),
    tooltip: customElements.get('uv-tooltip'),
    languageSwitcher: customElements.get('uv-language-switcher'),
    themeSwitcher: customElements.get('uv-theme-switcher')
  };
}

if (typeof globalThis !== 'undefined') {
  globalThis.UIVerse = {
    DesignTokens: globalThis.DesignTokens,
    registerUIVerseComponents
  };
}
