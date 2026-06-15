# Visual Regression Testing

This repository includes a basic Playwright visual regression test harness under `tests/visual`.

How to generate baseline screenshots (first run or when intentionally updating):

```bash
npx playwright test tests/visual --update-snapshots
```

How to verify visual regressions (CI uses this):

```bash
npx playwright test tests/visual
```

Notes:
- Tests use `file://` URLs so a local static server is not required.
- CI workflow `.github/workflows/visual-regression.yml` runs the visual tests on pull requests. Baseline snapshots should be committed in the branch when intentionally updated.
