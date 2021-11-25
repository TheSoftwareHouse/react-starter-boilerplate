#!/usr/bin/env zx
import { $, argv, chalk } from 'zx';
import { watch } from 'chokidar';

import config from './watcher.config';
import { Flag } from '../scripts.types';
import { debug, wrapTopLevelAwait } from '../scripts.utils';

const CY_INTEGRATION_DIR = argv[Flag.integrationDir] ?? config.testsDir;
const TEST_FILES_PATTERN = argv[Flag.testFilesPattern] ?? config.testFilesPattern;
const BROWSER = argv[Flag.browser] ?? config.browser;
const DEBUG = argv[Flag.debug];

let isRunning = false;
$.verbose = false;

debug(DEBUG, 'Integration dir:', CY_INTEGRATION_DIR);
debug(DEBUG, 'Test files pattern:', TEST_FILES_PATTERN);
debug(DEBUG, 'Browser:', BROWSER);

console.log(`Look for '${chalk.bgGrey(TEST_FILES_PATTERN)}' files that have changed since last commit. Trigger by changes in '${chalk.bgGrey(CY_INTEGRATION_DIR)}'`);

const runTests = async (_specs: string[]) => {
  if (isRunning) return;

  isRunning = true;
  try {
    await $`cypress run --headless --browser ${BROWSER} --spec ${_specs.join(',')}`.pipe(process.stdout);
  } catch (e) {
    console.warn(chalk.bgYellow('Something went wrong during Cypress run.'));
  }
  isRunning = false;
};

const getChangedSpecs = async () => {
  console.log(`\nLooking for changed test files...`);
  const changedFiles = await $`git diff --name-only HEAD`;
  debug(DEBUG, 'All changed files from last commit:', changedFiles.stdout.split('\n'));

  const onlySpecFiles = changedFiles.stdout
    .split('\n')
    .filter(file => file.match(TEST_FILES_PATTERN))
    .map(file => file.replace(config.pathFromGitToCurrentPackageJson, './'));

  if (onlySpecFiles.length > 0) {
    debug(DEBUG, 'Selected test files:', onlySpecFiles);
    return onlySpecFiles;
  } else {
    console.log(`\nNo changes were found in test files since last commit`);
    return [];
  }
};

let watcher = watch(CY_INTEGRATION_DIR, { persistent: true });
const getChangedFilesAndRunTest = async () => {
  if (isRunning) return;

  const specs = await getChangedSpecs();
  if (specs.length > 0) {
    console.log(chalk.bgGreen('Running tests for:'));
    console.log(JSON.stringify(specs, null, 2));
    await runTests(specs);
  }
  console.log(chalk.bgCyan(`\nWaiting for changes...`));
};

watcher.on(`change`, async () => await getChangedFilesAndRunTest());

wrapTopLevelAwait(getChangedFilesAndRunTest);
