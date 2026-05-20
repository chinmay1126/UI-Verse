/**
 * Theme Feature
 * Manages dark mode toggling and persistence
 */

const Theme = {
  _state: {
    initialized: false,
    listeners: new WeakMap()
  },

  _getToggleButtons() {
    const buttons = Array.from(document.querySelectorAll('.theme-toggle, #darkModeToggle, #themeToggle'));
    return Array.from(new Set(buttons));
  },

  _createToggleButton() {
    const navRight = document.querySelector('.nav-right');
    if (!navRight) return null;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.id = 'themeToggle';
    button.setAttribute('aria-label', 'Switch to dark mode');
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = '<i class="fa-solid fa-moon"></i>';

    const anchorButton = navRight.querySelector('.primary-nav-btn');
    if (anchorButton && anchorButton.nextSibling) {
      navRight.insertBefore(button, anchorButton.nextSibling);
    } else {
      navRight.appendChild(button);
    }

    return button;
  },

  _ensureToggleButtons() {
    const toggles = this._getToggleButtons();
    if (toggles.length > 0) return toggles;

    const injected = this._createToggleButton();
    return injected ? [injected] : [];
  },

  updateToggleState(themeToggles, isDark) {
    const buttons = Array.isArray(themeToggles) ? themeToggles : [themeToggles].filter(Boolean);

    buttons.forEach((themeToggle) => {
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('aria-pressed', String(isDark));

      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    });
  },

  _applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.updateToggleState(this._getToggleButtons(), isDark);

    document.dispatchEvent(new CustomEvent('uiverse:theme-change', {
      detail: {
        theme: isDark ? 'dark' : 'light',
        isDark
      }
    }));
  },

  _syncThemeFromStorage() {
    const saved = localStorage.getItem('theme');

    if (saved === 'dark') {
      this._applyTheme(true);
      return;
    }

    if (saved === 'light') {
      this._applyTheme(false);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this._applyTheme(prefersDark);
  },

  /**
   * Load and apply saved theme
   */
  load() {
    this._syncThemeFromStorage();
  },

  /**
   * Initialize theme feature
   */
  init() {
    if (this._state.initialized) return;

    const themeToggles = this._ensureToggleButtons();
    this.load();

    themeToggles.forEach((themeToggle) => {
      if (this._state.listeners.has(themeToggle)) return;

      const onClick = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const isDark = !document.body.classList.contains('dark-mode');
        this._applyTheme(isDark);
      };

      themeToggle.addEventListener('click', onClick, true);
      this._state.listeners.set(themeToggle, onClick);
    });

    this._state.initialized = true;
  },

  destroy() {
    this._getToggleButtons().forEach((themeToggle) => {
      const listener = this._state.listeners.get(themeToggle);
      if (listener) {
        themeToggle.removeEventListener('click', listener, true);
      }
    });

    this._state.listeners = new WeakMap();
    this._state.initialized = false;
  }
};

// Export for use in bootstrap
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Theme;
}
