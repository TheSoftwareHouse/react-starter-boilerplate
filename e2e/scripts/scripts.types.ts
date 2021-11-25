export type WatcherConfig = Config & {
  pathFromGitToCurrentPackageJson: string;
}

export type ParallelRunnerConfig = Config & {
  threads: number;
}

export type Config = {
  testFilesPattern: string;
  testsDir: string;
  browser: string;
}

export enum Flag {
  integrationDir = 'integration-dir',
  testFilesPattern = 'test-files-pattern',
  browser = 'browser',
  debug = 'debug',
  threads = 'threads'
}
