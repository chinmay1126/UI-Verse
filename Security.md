# Security Policy

## Project

**UIverse – Frontend Component Hub**
Part of *Nexus Spring of Code*

## Supported Versions

We actively maintain and provide security updates for:

| Version | Supported |
| --- | --- |
| Latest (main branch) | ✅ Yes |
| Older versions | ❌ No |

We recommend always using the **latest version** of UIverse.

## Reporting a Vulnerability

If you discover a security vulnerability in UIverse, please report it responsibly.

### Contact & Reporting Procedure

- **Private Vulnerability Reporting:** Please use GitHub's private vulnerability reporting feature on the repository dashboard if available.
- **Direct Maintainer Contact:** You can reach out directly to **Tushar Sonawane** or open a secure issue detailing the vulnerability.
- **Email Contact:** For confidential disclosure, please contact security@uiverse.org (or the designated maintainer email).

## What to Include

Please include the following details in your report:

- Description of the vulnerability and its potential impact
- Detailed steps to reproduce (or a proof-of-concept script/exploit)
- Expected vs actual behavior
- Possible impact severity (low, medium, high, critical)
- Screenshots or code snippets, if applicable

## Responsible Disclosure

We follow standard responsible disclosure practices:

- Do not publicly disclose vulnerabilities before a patch is released.
- Allow maintainers reasonable time to respond and implement a fix (usually 30 days).
- Avoid exploiting vulnerabilities beyond what is necessary for a proof of concept.

## Security Guidelines for Contributors

Since UIverse is a frontend-focused project (HTML, CSS, JavaScript), contributors must follow these strict security guidelines:

### DOM XSS Prevention

- **DOM Sanitization:** Avoid injecting untrusted inputs directly into properties like `innerHTML`, `outerHTML`, or `document.write`. Use `textContent` or `innerText` instead.
- **Safe Manipulation:** If HTML injection is necessary, sanitize the data first using a verified library like DOMPurify.
- **Event Handlers:** Do not use inline event handlers (e.g., `onload`, `onclick`) containing dynamic evaluations. Set event listeners dynamically via `addEventListener`.

### Content Security Policy (CSP) Compliance

- **Inline Scripts:** Avoid inline JavaScript where possible. Externalize script files to allow strict CSP rules.
- **Hashes & Nonces:** If inline scripts are required, they must have their integrity hashes generated and listed in the CSP verification suite (`npm run security:csp`).

### Dependencies & Third-Party Assets

- **Lockfile Integrity:** Ensure `package-lock.json` is updated securely using official registries.
- **CDN Policy:** Only import assets from trusted CDNs (e.g., Font Awesome, Google Fonts) and specify Subresource Integrity (SRI) attributes where supported.

## Scope of Security

This project mainly includes static UI components, client-side JavaScript, and web components. The primary areas of risk include:

- Cross-Site Scripting (XSS) in interactive components
- Dependency supply chain attacks
- Unsafe storage of user state in cookies/localStorage

## Acknowledgements

We appreciate contributors who responsibly report vulnerabilities and help improve the safety of UIverse 💙
