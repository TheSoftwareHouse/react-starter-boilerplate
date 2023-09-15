# E2E

## Setup

In this project for E2E testing you can use one of two frameworks:
[Cypress](https://www.cypress.io/) and [Playwright](https://playwright.dev/).

You need to choose first which frameworks you use:

*For using Cypress:*
```shell
cd e2e
npm install
cd ..
cp .env.dist .env
cp .env.e2e.dist ./e2e/.env
```

*For using Playwright:*
```shell
cd e2e-playwirght
npm install
cp .env.dist .env
npm run test
cd ..
```

Of course if you choose one of this tools you can remove the second one from your project.

## Details & Reasoning

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
