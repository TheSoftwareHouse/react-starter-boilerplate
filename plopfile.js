/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const promptDirectory = require('inquirer-directory');

// Relative path to shared ui components directory starting from src
const SHARED_UI_DIR_PATH = 'ui';

module.exports = function(plop) {
  plop.setPrompt('directory', promptDirectory);
  plop.setGenerator('component', {
    description: 'create component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
      },
      {
        type: 'directory',
        name: 'directory',
        message: 'select directory',
        basePath: './src',
      },
    ],
    actions: function(data) {
      const actions = [
        {
          type: 'add',
          path: 'src/{{directory}}/{{camelCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/component/Component.hbs',
        },
        {
          type: 'add',
          path: 'src/{{directory}}/{{camelCase name}}/{{pascalCase name}}.test.tsx',
          templateFile: 'plop-templates/component/Component.test.hbs',
        },
        {
          type: 'add',
          path: 'src/{{directory}}/{{camelCase name}}/{{pascalCase name}}.types.ts',
          templateFile: 'plop-templates/component/Component.types.hbs',
        },
      ];

      if (data.directory === SHARED_UI_DIR_PATH) {
        if (fs.existsSync(`src/${SHARED_UI_DIR_PATH}/index.ts`)) {
          actions.push({
            type: 'append',
            path: `src/${SHARED_UI_DIR_PATH}/index.ts`,
            pattern: /export \* from '.\/[a-z]+\/[a-z]+';(?!.*export)/is,
            template: "export * from './{{camelCase name}}/{{pascalCase name}}';",
          });
        } else {
          actions.push({
            type: 'add',
            path: `src/${SHARED_UI_DIR_PATH}/index.ts`,
            template: "export * from './{{camelCase name}}/{{pascalCase name}}';\r\n",
            skipIfExists: true,
          });
        }
      }

      return actions;
    },
  });
};
