# Application structure

## Root directory structure

`├──`[`.changeset`](.changeset) — data about changesets <br>
`├──`[`.github`](.github) — GitHub configuration including CI/CD workflows <br>
`├──`[`.husky`](.husky) — Husky scripts for git hooks <br>
`├──`[`docker`](docker) — Docker related files<br>
`├──`[`docs`](docs) — Application documentation files <br>
`├──`[`e2e`](e2e) — Cypress E2E tests project <br>
`├──`[`e2e-playwright`](e2e-playwright) — Playwright E2E tests project <br>
`├──`[`plop-templates`](plop-templates) — Templates for plop commands <br>
`├──`[`public`](public) — React application public files <br>
`├──`[`scripts`](scripts) — Custom scripts (ex. fetching translations) <br>
`├──`[`src`](src) — React application source code <br>

## Source code structure

`├──`[`api`](src/api) — Configuration of API client and collection of API actions (queries and mutations) definition. <br>
`├──`[`app`](src/app) — React application features (view components/modules) <br>
`├──`[`assets`](src/assets) - React application public assets (images, icons, custom fonts etc.) <br>
`├──`[`context`](src/context) - Global contexts using across React application. Each context has its context and controller files <br>
`├──`[`hooks`](src/hooks) - Global hooks used across the application. The best approach is to keep flat structure of hooks in this directory <br>
`├──`[`i18n`](src/i18n) - Configuration of internationalization module in SPA application. It also contains JSON files with application translations managed with Babelsheet tool <br>
`├──`[`providers`](src/providers) - Configuration of providers tree in React application <br>
`├──`[`routing`](src/routing) - Application routing definitions and implementation of special route components like `PrivateRoute` etc. <br>
`├──`[`tests`](src/tests) - Configuration of React application unit tests <br>
`├──`[`types`](src/types) - Global types used across the application <br>
`├──`[`ui`](src/ui) - Base UI components used across the application. The best approach is to keep flat structure of UI components in this directory <br>
`├──`[`utils`](src/utils) - Base utility functions used across the application. <br>
