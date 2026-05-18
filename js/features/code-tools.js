/**
 * Code Tools Feature
 * Provides copy, toggle, and color picker functionality for code blocks
 */

const CodeTools = {
  /**
   * Copy text using the Clipboard API when available, otherwise fall back to a hidden textarea.
   * @param {string} text
   * @returns {Promise<void>}
   */
  copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "true");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      textarea.style.left = "-9999px";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      let succeeded = false;
      try {
        succeeded = document.execCommand("copy");
      } catch (error) {
        succeeded = false;
      }

      textarea.remove();

      if (succeeded) {
        resolve();
      } else {
        reject(new Error("Clipboard copy failed"));
      }
    });
  },

  /**
   * Toggle visibility of a code block
   * @param {string} id - Code block element ID
   */
  toggleCode(id) {
    const codeBlock = getElement(id);
    if (!codeBlock) return;

    if (codeBlock.classList.contains("open")) {
      codeBlock.style.display = "none";
      codeBlock.classList.remove("open");
    } else {
      codeBlock.style.display = "block";
      codeBlock.classList.add("open");
    }
  },

  /**
   * Copy code to clipboard
   * @param {string} id - Code block element ID
   * @param {HTMLElement} btn - Button element (for feedback)
   */
  copyCode(id, btn) {
    const element = getElement(id);
    if (!element) return;

    // Support both <textarea>/<input> (use .value) and any other element (use .innerText)
    const code = (element.tagName === "TEXTAREA" || element.tagName === "INPUT")
      ? element.value
      : element.innerText;

    this.copyText(code)
      .then(() => {
        showToast("Code copied!");

        if (btn) {
          const originalText = btn.innerText;
          btn.innerText = "Copied ✓";
          btn.classList.add("copied");

          setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove("copied");
          }, 1500);
        }
      })
      .catch(() => {
        showToast("Failed to copy ❌");
        if (btn) btn.innerText = "Error";
      });
  },

  /**
   * Copy a color value to clipboard
   * @param {string} color - Color string
   */
  copyColor(color) {
    this.copyText(color)
      .then(() => {
        showToast(color + " copied!");
      })
      .catch(() => {
        showToast("Failed to copy ❌");
      });
  },

  /**
   * Copy RGB value to clipboard
   * @param {string} value - RGB value
   */
  copyRGB(value) {
    this.copyText(`rgb(${value})`)
      .then(() => {
        showToast(`rgb(${value}) copied!`);
      })
      .catch(() => {
        showToast("Failed to copy ❌");
      });
  },

  /**
   * Initialize code tools feature
   */
  init() {
    // Expose to global for backward compatibility with inline onclick handlers
    window.toggleCode = (id) => this.toggleCode(id);
    window.copyCode = (id, btn) => this.copyCode(id, btn);
    window.copyColor = (color) => this.copyColor(color);
    window.copyRGB = (value) => this.copyRGB(value);
  }
};

// Export for use in bootstrap
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CodeTools;
}
