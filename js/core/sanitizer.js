import DOMPurify from '/node_modules/dompurify/dist/purify.es.mjs';

// Browser-friendly sanitizer wrapper. Use like:
// import { sanitize } from '/js/core/sanitizer.js';
export function sanitize(html) {
  if (typeof window === 'undefined') return html;
  return DOMPurify.sanitize(html, {
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title'],
    ALLOWED_TAGS: null, // use default allowed tags
  });
}

export default { sanitize };
