import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.CI ? process.env.PLAYWRIGHT_HOST : 'http://localhost:3000';

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  testMatch: '**/*.test.ts',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['html', { outputFolder: 'test-report' }]],
  use: {
    baseURL: BASE_URL,
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  outputDir: 'test-results', // Folder for test artifacts such as screenshots, videos, traces, etc.
  webServer: {
    command: process.env.CI ? 'npm run serve' : `cd .. && npm run start`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
