# [PROJECT_NAME]

[PROJECT_DESCRIPTION]

This project was bootstrapped with [Vite](https://github.com/vitejs/vite) and modified by TSH team.

## Quick Start

To set up this project you need to follow this steps:

1. Install npm dependencies of the project:
```shell
npm install
```

2. Before your run your application locally, you need to set up environment variables:
```shell
cp .env.dist .env
```

3. Start your application locally:
```shell
npm start
```

## Scripts

- `start` - Launches the app in development mode on [http://localhost:3000](http://localhost:3000)
- `build` - Compiles and bundles the app for deployment*
- `build:ci` - Build command optimized for CI/CD pipelines
- `typecheck` - Validate the code using TypeScript compiler
- `preview` - Boot up a local static web server that serves application build. It's an easy way to check if the production build looks OK on your local machine
- `test` - Run unit tests with vitest
- `coverage` - Run unit tests with code coverage calculation
- `lint` - Validate the code using ESLint and Prettier
- `lint:fix` - Validate and fix the code using ESLint and Prettier
- `plop` - Run CLI with commands for code generation
- `translations` - Run [Babelsheet](https://github.com/TheSoftwareHouse/babelsheet2) tool for fetch the latest translations
- `serve:cypress` - Run Cypress E2E tests panel
- `version` - Build CHANGELOG file base on git commits history
- `e2e:open` - Run E2E tests panel
- `e2e:ci:firefox`: Run E2E tests on Firefox browser in CI pipelines
- `e2e:ci:chrome`: Run E2E tests on Chrome browser in CI pipelines

## Table of Contents

1. [Technology stack](/docs/01-technology-stack.md)
2. [Application structure](/docs/02-application-structure.md)
3. [React Query abstraction](/docs/03-react-query-abstraction.md)
4. [Using plop commands](/docs/04-using-plop-commands.md)
5. [E2E tests](/docs/05-e2e-tests.md)

## License

Copyright © 2021-present The Software House. This source code is licensed under the MIT license found in the
[LICENSE](LICENSE.md) file.

---
<sup>
Made with ♥ by The Software House (<a href="https://tsh.io">website</a>, <a href="https://tsh.io/blog">blog</a>)
</sup>

