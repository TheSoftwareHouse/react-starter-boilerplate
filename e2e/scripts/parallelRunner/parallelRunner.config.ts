import { ParallelRunnerConfig } from '../scripts.types';

export const config: ParallelRunnerConfig = {
  threads: 2,
  testFilesPattern: '*.test.ts',
  testsDir: './cypress/integration',
  browser: 'chrome',
};
export default config;
