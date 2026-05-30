import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/security',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    bypassCSP: true, // allow tests to run without altering CSP
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'node bench/bench.js',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
  },
});
