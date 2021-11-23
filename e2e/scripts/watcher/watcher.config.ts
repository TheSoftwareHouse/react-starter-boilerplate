import { Config } from './watcher.types';

const config: Config = {
  e2eCatalogRelativeToGitRepo: 'e2e',
  testsDir: process.env.PWD + `/cypress/integration`,
  watchedFilesPattern: '.*?(?=\.test).*?\.ts',
  browser: 'chrome'
};
export default config;
