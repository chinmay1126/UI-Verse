export { DesignTokens } from './design-tokens.mjs';
export { UVButton } from './components/uv-button.mjs';
export { UVModal } from './components/uv-modal.mjs';
export { UVTooltip } from './components/uv-tooltip.mjs';
export { UVLanguageSwitcher } from './components/uv-language-switcher.mjs';
export { UVThemeSwitcher } from './components/uv-theme-switcher.mjs';

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
