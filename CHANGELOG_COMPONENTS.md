# Component Changelog

Generated: 2026-05-19T00:00:00.000Z

## Features

### Copy All Styles (CSS Extractor) — 2026-05-19

**New Feature**: One-click button to copy complete CSS for any component including all nested selectors.

**Implementation**:
- Extended `js/features/code-tools.js` with `copyFullCSS(componentId)` function
- Automatically parses all stylesheets (local + external) to extract component-specific rules
- Extracts all nested selectors, pseudo-classes, and media queries
- Shows toast notification with selector count confirmation
- Added "Copy CSS" button to all component cards (.action-btn styled)
- Includes full dark mode support and accessibility attributes

**Files Modified**:
- `js/features/code-tools.js` — Added CSS extraction and copy functionality

**Usage**:
- Click the "CSS" button on any component card
- Button shows "Copying..." during extraction
- Toast displays selector count: e.g., "CSS copied! (12 selectors)"
- Supports all modern browsers with Clipboard API fallback

**Features**:
- ✅ Extracts component selectors and all children (e.g., `.profile-card`, `.profile-card .avatar`, etc.)
- ✅ Includes media queries affecting the component
- ✅ Skips CDN stylesheets (only local CSS)
- ✅ Handles cross-origin restrictions gracefully
- ✅ Responsive button styling with hover/copied states
- ✅ Accessible with ARIA labels and title attributes

---

## Alerts — alerts

Path: alerts.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Badges — badges

Path: badges.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Buttons — button

Path: button.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Cards — cards

Path: cards.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Color System — color

Path: color.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Footer — footer

Path: footer.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Forms — form

Path: form.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Home / Showcase — index

Path: index.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Navbar — navbar

Path: Navbar.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Pricing — pricing

Path: pricing.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Settings — settings

Path: settings.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Testimonials — testimonials

Path: testimonials.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

## Toggles — toggles

Path: toggles.html

Current version: **0.1.0**

Changelog:

- 2026-05-13 — 0.1.0 — Initial metadata generated

