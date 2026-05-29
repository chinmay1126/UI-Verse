# Accessibility Review Checklist

This checklist is a shared, repo-level guide for accessibility reviews. CI runs automated checks and this file lists manual review items for reviewers.

Automated checks (run in CI):
- Axe audits and remediation pipeline (`npm run audit:a11y`)
- Playwright E2E accessibility tests (`npm run test:e2e:accessibility`)
- Pa11y quick scan (in CI workflow)

Manual review items (please confirm during PR review):
- [ ] Keyboard focus order and visible focus indicators
- [ ] Semantic HTML and landmark roles are used appropriately
- [ ] Form labels and accessible names present
- [ ] Images have descriptive alt text or empty alt when decorative
- [ ] Color contrast meets WCAG AA for text and UI components
- [ ] Interactive controls have ARIA where necessary and correct roles
- [ ] Dynamic content updates are announced to assistive tech as needed
- [ ] No keyboard traps; all functionality is reachable via keyboard

If automated checks fail, they must be addressed before merging. Use `npm run a11y:remediate` and follow `Docs/ACCESSIBILITY_AUDIT_REMEDIATION.md` for remediation guidance.
