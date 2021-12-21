#!/usr/bin/env zx
import { $, argv, chalk, fs, glob } from 'zx';

import { Flag } from '../scripts.types';
import config from '../parallelRunner/parallelRunner.config';
import { debug, wrapTopLevelAwait } from '../scripts.utils';

const CY_INTEGRATION_DIR = argv[Flag.integrationDir] ?? config.testsDir;
const TEST_FILES_PATTERN = argv[Flag.testFilesPattern] ?? config.testFilesPattern;
const BROWSER = argv[Flag.browser] ?? config.browser;
const THREADS = argv[Flag.threads] ?? config.threads;
const DEBUG = argv[Flag.debug];
$.verbose = false;

debug(DEBUG, 'Integration dir:', CY_INTEGRATION_DIR);
debug(DEBUG, 'Test files pattern:', TEST_FILES_PATTERN);
debug(DEBUG, 'Browser:', BROWSER);
debug(DEBUG, 'Threads:', THREADS);

const runTestsParallel = async () => {
  console.time(chalk.bgGray('Total execution time'));
  const filesFullPaths = await glob(`${CY_INTEGRATION_DIR}/**/${TEST_FILES_PATTERN}`);
  debug(DEBUG, 'Full paths of found files: ', JSON.stringify(filesFullPaths, null, 2));

  if (!process.env.PWD) {
    debug(DEBUG, 'PWD not found');
    return;
  }

  const files = filesFullPaths.map(filename => filename.replace(process.env.PWD!, '.'));
  const chunks: string[][] = [];
  debug(DEBUG, 'Files after absolute dir replacement:', JSON.stringify(files, null, 2));

  if (files.length / THREADS < 1) {
    console.log(chalk.bgRed(`Cannot create more threads than files amount. Requested threads: ${THREADS}. Files amount: ${files.length}.`));
    return;
  }
  const chunkSize = Math.ceil(files.length / THREADS);
  debug(DEBUG, 'Chunk size:', chunkSize);

  for (let i = 0; i < THREADS; i++) {
    chunks.push(files.splice(0, chunkSize));
  }

  console.log(chalk.bgGreen('Running tests in following chunks:'));
  console.log(JSON.stringify(chunks, null, 2));
  console.log('Testing in progress...\n');

  const dir = fs.readdirSync(`./`);
  if (dir.includes('testsResults')) {
    await $`rm -rf testsResults/*`;
    debug(DEBUG, 'Removed old tests results.');
  } else {
    await $`mkdir testsResults`;
    debug(DEBUG, 'Created tests results directory.');
  }

  let threadsLeft = THREADS;

  chunks.forEach((part, index) => {
    $`cypress run --headless --browser ${BROWSER} --spec ${part.join(',')} &`
      .pipe(fs.createWriteStream(`./testsResults/cy-chunk-${index + 1}.txt`))
      .then(() => {
        threadsLeft--;
        console.log(`Thread ${index + 1} finished job. Left ${threadsLeft} threads.\n`);
        if (!threadsLeft) {
          console.timeEnd(chalk.bgGray('Total execution time'));
          console.log(chalk.bgCyanBright(`Check results at: './testsResults/*'`));
        }
      });
  });
};

wrapTopLevelAwait(runTestsParallel);
