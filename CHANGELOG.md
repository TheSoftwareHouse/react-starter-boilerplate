# react-starter-boilerplate

## 0.3.0

### Minor Changes

- 4e09c15: update node version to v20 & update dependencies
- c4d6572: replace react router with tanstack router
- 0848f71: refactor: [ZN-411] Improve API action plop commands
- 6b5cc27: add ErrorBoundary component
- 259046f: Change /help page to be a lazy route as an example
- bd75e92: Split sentry packages to a dedicated sentry chunk
- a559922: add api error standardization & handling global api errors
- 9e02073: Add build:analyze command

### Patch Changes

- 82aa887: bump typescript to 5.4.3
- 6703321: feat: [ZN-388] New starter documentation
- f4b87ec: Remove wdyr from application
- 837ede0: exclude whyDidYouRender from production bundle
- cfbdae5: feat: restore msw in development in new version
- 08c9b32: build: remove unnecessary packages from starter project
- a53bf2b: bump axios to 1.6.8
- ea393be: feat: [ZN-522] Update project Node version to the latest LTS
- c21175e: feat: [ZN-504] Update dependencies to latest versions
- d9bff8f: feat: refactor plopfile
- 13a2668: Remove full-icu package since it is a default since Node 13
- 2d4aca7: fix: regenerate lock file with a bigger `semver` package version to satisfy a `npm ci` command
- 7b90580: Change type to module to disable warning about using cjs vite
- 12f61ed: feat: Add new utils for handling translations in application
- 93acf6a: feat: [ZN-527] Remove unnecessary auto-changelog package
- e72338c: fix: Improve useInfiniteQuery hook typing
- 1380359: feat: Add plop commands for React contexts
- 2d4aca7: chore: bump `actions/upload-artifact` and `actions/download-artifact` to v4
- 550ec45: fix: add ts-node config to tsconfig.json and use it during translations generation
- 0201399: fix sentry type errors & import integrations from correct package
- f507d9c: feat: Create hook in React Context plop command
- 676a8bc: Enhance README with instructions on setting up the .env.local file
- 58af1a9: feat: Add container component plop command, add few other improvements to plopfile
- 6d63b2a: fixup: fix Vite config file

## 0.2.0

### Minor Changes

- a064e5e: add e2e playwright
- a857de7: bump node version from 14 to 16 bump `tshio/awscli-docker-compose-pipelines` img version from `0.0.3` to
  `0.0.5`
- 3e72dd6: setup eslint a11y plugin

### Patch Changes

- dc8d506: Update React component plop command

## 0.1.1

### Patch Changes

- b4197a9: add versioning and changelogs
