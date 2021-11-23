import { Config } from './watcher.types';

const config: Config = {
  e2eCatalogRelativeToGitRepo: 'e2e',
  testsDir: process.env.PWD + `/cypress/integration`,
  watchedFilesPattern: 'e2e\\/.*\\/integration\\/.*?(?=.test).*?.ts',
  browser: 'chrome'
};
export default config;
