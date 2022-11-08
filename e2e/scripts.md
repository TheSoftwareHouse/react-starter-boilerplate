# Cypress testing helpers

### Before all

Firstly, you should transpile scripts to JS so that script doesn't have to transpile those files before each run (~
+8s).  
Just change directory to `./e2e` and run:

```
npm run transpile:scripts
```

## Watcher

Script that reads test-files from git that have changed since last commit and runs headless test only for those files.

### Usage

- you have to be in `./e2e` directory in terminal
- `npm run cypress:watch:chrome` or `npm run cypress:watch:firefox`

### Configuration

You can change [default configuration](scripts/watcher/watcher.config.ts) by adding flags to script in
[package.json](package.json)

#### Browser

```
--browser chrome | firefox | egde | ...(any other cypress-compatible browser)
```

**Default:** `chrome`

---

#### Tests directory

Directory where all test files are located. Changes in all files under this directory trigger test run. Directory is
relative to [package.json](package.json) from which script is executed.

```
--integration-dir ./cypress/e2e
```

**Default:** `./cypress/e2e`

---

#### Test files pattern

Script runs tests only for files that match that pattern.

```
--test-files-pattern 'e2e\/cypress\/e2e\/.*?(?=.cy).*?.ts'
```

> **Explanation:** each `*.cy.ts` file that is located under `./e2e/cypress/e2e/...` directory relative to git repo root

> **Important:** File names are taken from git, so those are paths relative to git root e.g.:  
> `e2e/cypress/e2e/navigation/navigation.cy.ts`

**Default:** `e2e\/cypress\/e2e\/.*?(?=.cy).*?.ts`

---

#### Debug mode

Just more console logs

```
--debug
```

**Default:** `false`

---

## Parallel runner

Script that reads all tests files, splits them into multiple chunks and runs separate tests for each chunk at the same
time.

### Usage

- you have to be in `/e2e/` directory in terminal
- `npm run cypress:parallel:chrome` or `npm run cypress:parallel:firefox`

### Configuration

You can change [default configuration](scripts/parallelRunner/parallelRunner.config.ts) by adding flags to script in
[package.json](package.json)

#### Browser

```
--browser chrome | firefox | egde | ...(any other cypress-compatible browser)
```

**Default:** `chrome`

---

#### Tests directory

Directory where all test files are located. Changes in all files under this directory trigger test run. Directory is
relative to [package.json](package.json) from which script is executed.

```
--integration-dir ./cypress/e2e
```

**Default:** `./cypress/e2e`

---

#### Test files pattern

Script runs tests only for files that match that pattern.

```
--test-files-pattern '*.cy.ts'
```

> **Important:** In this case, unlike in the watcher script, we just use wildcard for filename. It's because under the
> hood it uses different approach to read files.

**Default:** `*.cy.ts`

---

#### Threads

Amount of chunks all tests files to be split on.

```
--threads 2
```

**Default:** `2`

#### Debug mode

Just more console logs

```
--debug
```

**Default:** `false`
