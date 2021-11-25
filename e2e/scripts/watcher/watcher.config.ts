import { Config } from '../scripts.types';

const config: Config = {
  pathFromGitToCurrentPackageJson: 'e2e/',
  testsDir: `./cypress/integration`,
  testFilesPattern: 'e2e\\/cypress\\/integration\\/.*?(?=.test).*?.ts',
  browser: 'chrome',
};
export default config;
