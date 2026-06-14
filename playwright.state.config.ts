import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/state',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:8000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npx serve -l 8000 .',
    url: 'http://localhost:8000',
    reuseExistingServer: !process.env.CI,
    cwd: '.'
  },
});
