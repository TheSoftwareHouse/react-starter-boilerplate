import { defineConfig } from 'cypress';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const wp = require('@cypress/webpack-preprocessor');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-safe').config({ path: '.env', example: '../.env.e2e.dist' });

const options = {
  webpackOptions: {
    mode: 'development',
    // make sure the source maps work
    devtool: 'eval-source-map',
    // webpack will transpile TS and JS files
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
      ],
    },
  },
};

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_HOST,
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {
      on('file:preprocessor', wp(options));

      config.env.baseUrl = process.env.CYPRESS_HOST;
      config.env.userLogin = process.env.CYPRESS_USER_LOGIN;
      config.env.userPassword = process.env.CYPRESS_USER_PASSWORD;
      return config;
    },
  },
});
