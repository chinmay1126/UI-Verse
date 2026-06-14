/**
 * UIverse Component Internationalization Manager
 * 
 * Provides comprehensive i18n support for component metadata:
 * - Multi-language component definitions
 * - Translation management and fallbacks
 * - Language detection and routing
 * - Plural handling and formatting
 * - Translation caching and performance
 * 
 * @version 1.0.0
 * @author UIverse Community
 * @license MIT
 */

class ComponentI18nManager {
  /**
   * Initialize Component I18n Manager
   * 
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.defaultLanguage = options.defaultLanguage || 'en';
    this.supportedLanguages = options.supportedLanguages || [
      'en', 'es', 'fr', 'de', 'ja', 'zh', 'pt', 'ru', 'ko', 'it'
    ];
    this.fallbackLanguage = options.fallbackLanguage || 'en';
    
    this.translations = new Map(); // lang -> namespace -> key -> translation
    this.components = new Map(); // componentName -> i18n metadata
    this.translationCache = new Map();
    this.enableCaching = options.enableCaching !== false;
    this.cacheSize = options.cacheSize || 500;
    
    this.pluralRules = {
      'en': new Intl.PluralRules('en'),
      'es': new Intl.PluralRules('es'),
      'fr': new Intl.PluralRules('fr'),
      'de': new Intl.PluralRules('de'),
      'ja': new Intl.PluralRules('ja'),
      'zh': new Intl.PluralRules('zh'),
      'pt': new Intl.PluralRules('pt'),
      'ru': new Intl.PluralRules('ru'),
      'ko': new Intl.PluralRules('ko'),
      'it': new Intl.PluralRules('it')
    };

    this.formatters = {
      'en': new Intl.DateTimeFormat('en'),
      'es': new Intl.DateTimeFormat('es'),
      'fr': new Intl.DateTimeFormat('fr'),
      'de': new Intl.DateTimeFormat('de'),
      'ja': new Intl.DateTimeFormat('ja'),
      'zh': new Intl.DateTimeFormat('zh'),
      'pt': new Intl.DateTimeFormat('pt'),
      'ru': new Intl.DateTimeFormat('ru'),
      'ko': new Intl.DateTimeFormat('ko'),
      'it': new Intl.DateTimeFormat('it')
    };
  }

  /**
   * Register component with i18n metadata
   * 
   * @param {string} componentName - Component identifier
   * @param {Object} i18nMetadata - Internationalization metadata
   */
  registerComponent(componentName, i18nMetadata) {
    if (!i18nMetadata.supportedLanguages || i18nMetadata.supportedLanguages.length === 0) {
      throw new Error(`Component ${componentName} must define supportedLanguages`);
    }

    this.components.set(componentName, {
      name: componentName,
      defaultLanguage: i18nMetadata.defaultLanguage || this.defaultLanguage,
      supportedLanguages: i18nMetadata.supportedLanguages,
      fallbackLanguage: i18nMetadata.fallbackLanguage || i18nMetadata.supportedLanguages[0],
      translations: i18nMetadata.translations || {},
      metadata: {
        author: i18nMetadata.author,
        version: i18nMetadata.version || '1.0.0',
        lastUpdated: i18nMetadata.lastUpdated || Date.now(),
        completeness: this.calculateCompleteness(i18nMetadata)
      }
    });
  }

  /**
   * Get component metadata in specific language
   * 
   * @param {string} componentName - Component identifier
   * @param {string} language - Target language code
   * @returns {Object} - Localized component metadata
   */
  getComponentMetadata(componentName, language) {
    const component = this.components.get(componentName);
    if (!component) {
      throw new Error(`Component not found: ${componentName}`);
    }

    const cacheKey = `${componentName}:${language}`;
    if (this.enableCaching && this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey);
    }

    // Resolve language with fallback
    const resolvedLanguage = this.resolveLanguage(language, component.supportedLanguages);

    const metadata = {
      name: componentName,
      language: resolvedLanguage,
      fallback: resolvedLanguage !== language,
      ...this.getTranslations(componentName, resolvedLanguage)
    };

    if (this.enableCaching) {
      this.setCache(cacheKey, metadata);
    }

    return metadata;
  }

  /**
   * Get translations for component
   * 
   * @private
   */
  getTranslations(componentName, language) {
    const component = this.components.get(componentName);
    if (!component) return {};

    const translations = component.translations[language] || {};
    return {
      name: translations.name || componentName,
      description: translations.description || '',
      category: translations.category || '',
      tags: translations.tags || [],
      usage: translations.usage || '',
      examples: translations.examples || [],
      notes: translations.notes || '',
      deprecationNote: translations.deprecationNote || null
    };
  }

  /**
   * Translate a key with placeholder substitution
   * 
   * @param {string} componentName - Component identifier
   * @param {string} key - Translation key (e.g., 'description')
   * @param {Object} params - Placeholder values
   * @param {string} language - Target language
   * @returns {string} - Translated and formatted string
   */
  translate(componentName, key, params = {}, language = this.defaultLanguage) {
    const component = this.components.get(componentName);
    if (!component) {
      return key; // Fallback to key if component not found
    }

    const resolvedLanguage = this.resolveLanguage(language, component.supportedLanguages);
    const translations = component.translations[resolvedLanguage] || {};
    let text = translations[key] || '';

    // Substitute parameters
    for (const [paramKey, paramValue] of Object.entries(params)) {
      const regex = new RegExp(`\\{${paramKey}\\}`, 'g');
      text = text.replace(regex, paramValue);
    }

    return text;
  }

  /**
   * Resolve language with fallback chain
   * 
   * @private
   */
  resolveLanguage(requestedLanguage, supportedLanguages) {
    // Exact match
    if (supportedLanguages.includes(requestedLanguage)) {
      return requestedLanguage;
    }

    // Language family match (e.g., en-US -> en)
    const baseLanguage = requestedLanguage.split('-')[0];
    if (supportedLanguages.includes(baseLanguage)) {
      return baseLanguage;
    }

    // Fallback to default
    return supportedLanguages[0] || this.defaultLanguage;
  }

  /**
   * Get supported languages for component
   * 
   * @param {string} componentName - Component identifier
   * @returns {Object} - Language support information
   */
  getLanguageSupport(componentName) {
    const component = this.components.get(componentName);
    if (!component) {
      throw new Error(`Component not found: ${componentName}`);
    }

    const support = {};
    for (const lang of component.supportedLanguages) {
      const translations = component.translations[lang] || {};
      const total = Object.keys(this.getTranslations(componentName, lang)).length;
      const translated = Object.keys(translations).length;
      
      support[lang] = {
        isDefault: lang === component.defaultLanguage,
        isFallback: lang === component.fallbackLanguage,
        completeness: (translated / total * 100).toFixed(2) + '%',
        translatedKeys: translated,
        totalKeys: total
      };
    }

    return {
      component: componentName,
      supportedLanguages: component.supportedLanguages,
      defaultLanguage: component.defaultLanguage,
      fallbackLanguage: component.fallbackLanguage,
      languageSupport: support
    };
  }

  /**
   * Detect user language from accept-language header
   * 
   * @param {string} acceptLanguageHeader - Accept-Language header value
   * @param {string[]} availableLanguages - Available languages for fallback
   * @returns {string} - Best matching language code
   */
  detectLanguage(acceptLanguageHeader, availableLanguages = this.supportedLanguages) {
    if (!acceptLanguageHeader) {
      return this.defaultLanguage;
    }

    const languages = this.parseAcceptLanguage(acceptLanguageHeader);
    
    for (const lang of languages) {
      // Exact match
      if (availableLanguages.includes(lang.code)) {
        return lang.code;
      }

      // Base language match
      const baseCode = lang.code.split('-')[0];
      if (availableLanguages.includes(baseCode)) {
        return baseCode;
      }
    }

    return this.defaultLanguage;
  }

  /**
   * Parse Accept-Language header
   * 
   * @private
   */
  parseAcceptLanguage(header) {
    return header
      .split(',')
      .map(lang => {
        const [code, q] = lang.trim().split(';q=');
        return {
          code: code.trim(),
          quality: parseFloat(q) || 1.0
        };
      })
      .sort((a, b) => b.quality - a.quality);
  }

  /**
   * Format plural string
   * 
   * @param {number} count - Count for plural form
   * @param {Object} forms - Plural forms object
   * @param {string} language - Language code
   * @returns {string} - Formatted plural string
   */
  formatPlural(count, forms, language = this.defaultLanguage) {
    const pluralRule = this.pluralRules[language];
    if (!pluralRule) {
      return forms.other || '';
    }

    const rule = pluralRule.select(count);
    return forms[rule] || forms.other || '';
  }

  /**
   * Format date for language
   * 
   * @param {Date|number} date - Date to format
   * @param {string} language - Language code
   * @param {Object} options - Formatting options
   * @returns {string} - Formatted date
   */
  formatDate(date, language = this.defaultLanguage, options = {}) {
    const formatter = new Intl.DateTimeFormat(language, options);
    return formatter.format(date);
  }

  /**
   * Format number for language
   * 
   * @param {number} number - Number to format
   * @param {string} language - Language code
   * @param {Object} options - Formatting options
   * @returns {string} - Formatted number
   */
  formatNumber(number, language = this.defaultLanguage, options = {}) {
    const formatter = new Intl.NumberFormat(language, options);
    return formatter.format(number);
  }

  /**
   * Calculate translation completeness percentage
   * 
   * @private
   */
  calculateCompleteness(i18nMetadata) {
    const supportedLanguages = i18nMetadata.supportedLanguages || [];
    if (supportedLanguages.length === 0) return 0;

    const translations = i18nMetadata.translations || {};
    const defaultLang = i18nMetadata.defaultLanguage || i18nMetadata.supportedLanguages[0];
    const defaultTranslations = translations[defaultLang] || {};
    const defaultKeys = Object.keys(defaultTranslations);

    let totalCompleteness = 0;
    for (const lang of supportedLanguages) {
      const langTranslations = translations[lang] || {};
      const langKeys = Object.keys(langTranslations);
      const completeness = (langKeys.length / (defaultKeys.length || 1)) * 100;
      totalCompleteness += completeness;
    }

    return (totalCompleteness / supportedLanguages.length).toFixed(2);
  }

  /**
   * Add translation for component
   * 
   * @param {string} componentName - Component identifier
   * @param {string} language - Language code
   * @param {Object} translations - Translation key-value pairs
   */
  addTranslation(componentName, language, translations) {
    const component = this.components.get(componentName);
    if (!component) {
      throw new Error(`Component not found: ${componentName}`);
    }

    if (!component.supportedLanguages.includes(language)) {
      throw new Error(`Language not supported: ${language}`);
    }

    component.translations[language] = {
      ...component.translations[language],
      ...translations
    };

    component.metadata.completeness = this.calculateCompleteness({
      supportedLanguages: component.supportedLanguages,
      defaultLanguage: component.defaultLanguage,
      translations: component.translations
    });

    // Invalidate cache
    this.translationCache.clear();
  }

  /**
   * Get all components with language metadata
   * 
   * @returns {Object[]} - Array of component language metadata
   */
  getComponentLanguageMetadata() {
    const metadata = [];
    
    for (const [componentName, component] of this.components) {
      metadata.push({
        component: componentName,
        ...this.getLanguageSupport(componentName),
        metadata: component.metadata
      });
    }

    return metadata;
  }

  /**
   * Export translations for external tools
   * 
   * @param {string} format - Export format (json, csv, xliff)
   * @returns {string} - Exported translations
   */
  exportTranslations(format = 'json') {
    const data = {};
    
    for (const [componentName, component] of this.components) {
      data[componentName] = {
        languages: component.supportedLanguages,
        translations: component.translations
      };
    }

    switch (format) {
      case 'csv':
        return this.exportAsCSV(data);
      case 'xliff':
        return this.exportAsXLIFF(data);
      case 'json':
      default:
        return JSON.stringify(data, null, 2);
    }
  }

  /**
   * Export as CSV
   * 
   * @private
   */
  exportAsCSV(data) {
    let csv = 'Component,Language,Key,Value\n';
    
    for (const [componentName, component] of Object.entries(data)) {
      for (const [lang, translations] of Object.entries(component.translations)) {
        for (const [key, value] of Object.entries(translations)) {
          const escapedValue = String(value).replace(/"/g, '""');
          csv += `${componentName},${lang},${key},"${escapedValue}"\n`;
        }
      }
    }

    return csv;
  }

  /**
   * Export as XLIFF
   * 
   * @private
   */
  exportAsXLIFF(data) {
    let xliff = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xliff += '<xliff version="1.2">\n';

    for (const [componentName, component] of Object.entries(data)) {
      for (const [lang, translations] of Object.entries(component.translations)) {
        xliff += `  <file original="${componentName}" source-language="en" target-language="${lang}">\n`;
        xliff += '    <body>\n';
        
        for (const [key, value] of Object.entries(translations)) {
          xliff += `      <trans-unit id="${key}">\n`;
          xliff += `        <source>${this.escapeXML(value)}</source>\n`;
          xliff += `        <target>${this.escapeXML(value)}</target>\n`;
          xliff += '      </trans-unit>\n';
        }

        xliff += '    </body>\n';
        xliff += '  </file>\n';
      }
    }

    xliff += '</xliff>';
    return xliff;
  }

  /**
   * Escape XML special characters
   * 
   * @private
   */
  escapeXML(str) {
    return String(str).replace(/[<>&'"]/g, c => {
      const chars = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' };
      return chars[c];
    });
  }

  /**
   * Set cache with LRU eviction
   * 
   * @private
   */
  setCache(key, value) {
    if (this.translationCache.size >= this.cacheSize) {
      const firstKey = this.translationCache.keys().next().value;
      this.translationCache.delete(firstKey);
    }
    this.translationCache.set(key, value);
  }

  /**
   * Clear all caches
   */
  clearCache() {
    this.translationCache.clear();
  }

  /**
   * Get manager statistics
   * 
   * @returns {Object} - Manager statistics
   */
  getStats() {
    return {
      totalComponents: this.components.size,
      cacheSize: this.translationCache.size,
      maxCacheSize: this.cacheSize,
      supportedLanguages: this.supportedLanguages,
      defaultLanguage: this.defaultLanguage
    };
  }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComponentI18nManager;
}
