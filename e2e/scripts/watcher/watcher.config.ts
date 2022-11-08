import { WatcherConfig } from '../scripts.types';

const config: WatcherConfig = {
  pathFromGitToCurrentPackageJson: 'e2e/',
  testsDir: `./cypress/e2e`,
  testFilesPattern: 'e2e\\/cypress\\/e2e\\/.*?(?=.cy).*?.ts',
  browser: 'chrome',
};
export default config;
