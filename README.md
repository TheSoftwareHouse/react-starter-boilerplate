<img src="/docs/images/react-starter.svg" />
<p>
This project was bootstrapped with [Vite] (https://github.com/vitejs/vite) and modified by TSH team.

![GitHub stars](https://img.shields.io/github/stars/TheSoftwareHouse/react-starter-boilerplate?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/TheSoftwareHouse/react-starter-boilerplate?style=social)
![GitHub folloers](https://img.shields.io/github/followers/TheSoftwareHouse?style=social)

![Version](https://img.shields.io/github/package-json/v/TheSoftwareHouse/react-starter-boilerplate)
![GitHub Release](https://img.shields.io/github/v/release/TheSoftwareHouse/react-starter-boilerplate)
![GitHub License](https://img.shields.io/github/license/TheSoftwareHouse/react-starter-boilerplate)

</p>

## Quick Start

To start the development, run:

```
mkdir new-project
cd new-project/
git clone https://github.com/TheSoftwareHouse/react-starter-boilerplate.git .
sudo rm -r .git
git init
git remote add origin [your empty project repository]
git remote -v
git add .
git commit -m 'initial commit'
git push origin master
npm install

*for e2e Cypress*
cd e2e
npm install
cd ..
cp .env.dist .env
cp .env.e2e.dist ./e2e/.env

*for e2e Playwright*
cd e2e-playwirght
npm install
cp .env.dist .env
npm run test
cd ..

npm run lint:fix
npm run test
npm run e2e:ci
```

where `new-project` is your desired folder. This should result in cloning the project, setting up your repository as
origin and pushing the starter as your initial commit. The linter and tests will be run, to confirm that everything
works properly.

## E2E

For E2E testing we are using one of two solutions: the [Cypress](https://www.cypress.io/) framework and the
[Playwright](https://playwright.dev/) framework.

### Details & Reasoning

The configuration is mostly isolated to the e2e folder (and e2e-playwright), to allow for easy removal when not needed
and to avoid conflicts with any other testing libraries, as they tend to pollute the global namespace. We believe that
proper e2e testing is extremely valuable, but we also recognize that it's not for everyone and it will probably be one
of the most removed or ignored features in the boilerplate versions.

We also propose the second solution - e2e tests using Playwright, therefore the e2e-playwright folder has been created.
When starting the project, if automatic tests will be written, you should stick to one solution (Cypress or Playwright)
and remove redundant files and code. For example, if you choose Playwright, you should delete the e2e folder, rename
e2e-playwright to e2e and remove all commented Cypress config code in CI configuration files.

To get rid of e2e testing simply delete the e2e and e2e-playwright directory, the e2e.dist env file, anything beginning
with "e2e" from package.json's scripts field and the step named "e2e" from the bitbucket pipelines configuration.

#### [Cypress testing helpers](e2e/scripts.md)

## Environment

### Development

The repository contains a .env.dist file with a list of all env variables used in the application and a .env.e2e.dist
file with variables used by the e2e framework. To use on local environment copy .env.dist to root folder as .env and
fill any missing variables (`cp .env.dist .env`), to use e2e testing copy .env.e2e.dist to e2e/ folder, rename to .env
(`cp .env.e2e.dist ./e2e/.env`) and fill any missing variables.

## Available Scripts

In the project directory, you can run:

### `npm lint(:fix)`

Runs the linter (and fixes fixable issues)

### `npm plop`

Runs [Plop JS](https://plopjs.com/) used for generating custom hooks and react components.

### `e2e:run:firefox` or `e2e:run:chrome`

Runs Cypress E2E tests in a headless mode (the browser window is not visible)

### `e2e:open`

Opens the Cypress UI, allowing to run and watch E2E tests

### `e2e:ci:firefox` or `e2e:ci:chrome`

Builds the app as a CI environment, sets up an html server with `npm run serve` and runs the E2E tests in a headless
mode. Useful when investigating pipeline failures.

### `npm start`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000) to view it in the
browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br /> See the section about
[running tests](https://vitest.dev/guide/cli.html#vitest) for more information.

### `npm run coverage`

Launches the test runner in the coverage report generation mode.<br /> See
[this](https://vitest.dev/guide/coverage.html) section for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br /> It correctly bundles React in production mode and optimizes
the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.
