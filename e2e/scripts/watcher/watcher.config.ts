import { Config } from './watcher.types';

export default {
  testsDir: process.env.PWD + `/cypress/integration`,
  watchedFilesPattern: '.*?(?=\.spec).*?\.ts',
} as Config;
