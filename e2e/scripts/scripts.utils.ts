import { chalk } from 'zx';

export const wrapTopLevelAwait = async (fn: (...args: unknown[]) => unknown, ...args: unknown[]) => {
  await fn(...args);
};

export const debug = (isDebug: boolean, ...args: any[]) => {
  if (isDebug) {
    console.log(chalk.bgBlack('[DEBUG]', ...args));
  }
};
