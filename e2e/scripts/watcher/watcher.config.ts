import { Config } from '../scripts.types';

const config: Config = {
  pathFromGitToCurrentPackageJson: 'e2e/',
  testsDir: `./cypress/integration`,
  testFilesPattern: 'e2e\\/.*\\/integration\\/.*?(?=.test).*?.ts',
  browser: 'chrome',
};
export default config;
