// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// eslint-disable-next-line
const wp = require('@cypress/webpack-preprocessor');

// this will fail if variables defined in the .dist file are not available either in the environment on the .env file
// Anything already defined in the environment is not overriden by the values from .env
require('dotenv-safe').config({ path: '.env', example: '../.env.e2e.dist' });

module.exports = (on, config) => {
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
  on('file:preprocessor', wp(options));

  config.env.baseUrl = process.env.CYPRESS_HOST;

  return config;
};
