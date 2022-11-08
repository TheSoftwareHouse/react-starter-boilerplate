import { ParallelRunnerConfig } from '../scripts.types';

export const config: ParallelRunnerConfig = {
  threads: 2,
  testFilesPattern: '*.cy.ts',
  testsDir: './cypress/e2e',
  browser: 'chrome',
};
export default config;
