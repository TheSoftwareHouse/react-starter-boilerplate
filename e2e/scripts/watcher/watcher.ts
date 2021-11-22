#!/usr/bin/env zx
import { $, chalk } from 'zx';
import { watch } from 'chokidar';

import config from './watcher.config';

const CY_INTEGRATION_DIR = config.testsDir ?? process.env.PWD + `/cypress/integration`;
const TEST_FILES_PATTERN = config.watchedFilesPattern ?? '.*?(?=\.spec).*?\.ts';
let isRunning = false;

console.log(`Watching for: '${TEST_FILES_PATTERN}' changed since last commit. Triggers by changes in '${CY_INTEGRATION_DIR}'`)

const wrapTopLevelAwait = async (fn: (...args: unknown[]) => unknown, ...args: unknown[]) => {
  await fn(...args);
};

const runTests = async (_specs: string[]) => {
  if (isRunning) return;

  isRunning = true;
  try {
    await $`cypress run --headless --browser chrome --spec ${_specs.join(',')}`;
  } catch (e) {
  }
  isRunning = false;
};

const getChangedSpecs = async () => {
  console.log(`\nChecking for changed specs...`);
  $.verbose = false;
  const changedFiles = await $`git diff --name-only HEAD`;
  $.verbose = true;
  const onlySpecFiles = changedFiles.stdout
    .split('\n')
    .filter(file => file.match(TEST_FILES_PATTERN))
    .map(file => `./${file}`);
  if (onlySpecFiles.length > 0) {
    return onlySpecFiles;
  } else {
    console.log(`\nNo changes was found since last commit`);
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
