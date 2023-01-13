/* eslint-disable @typescript-eslint/no-var-requires */
const promptDirectory = require('inquirer-directory');

const componentTypes = {
  REACT_COMPONENT: 'React component',
  CUSTOM_HOOK: 'Custom hook',
  API_ACTIONS: 'API actions',
};

const customHookGenerator = () => ({
  description: componentTypes.CUSTOM_HOOK,
  prompts: [
    {
      type: 'directory',
      name: 'directory',
      message: 'select directory',
      basePath: './src/hooks',
    },
    {
      type: 'input',
      name: 'name',
      message: 'hook name',
    },
  ],
  actions: function() {
    const actions = [
      {
        type: 'add',
        path: 'src/hooks/{{directory}}/{{camelCase name}}/{{camelCase name}}.tsx',
        templateFile: 'plop-templates/hook/hook.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/{{directory}}/{{camelCase name}}/{{camelCase name}}.test.tsx',
        templateFile: 'plop-templates/hook/hook.test.hbs',
      },
      {
        type: 'modify',
        path: 'src/hooks/index.ts',
        pattern: 'export',
        templateFile: 'plop-templates/hook/hook.index.hbs',
      },
    ];

    return actions;
  },
});

const reactComponentGenerator = () => ({
  description: componentTypes.REACT_COMPONENT,
  prompts: [
    {
      type: 'list',
      name: 'baseDir',
      message: 'base directory',
      choices: ['ui', 'app'],
      default: 1,
    },
    {
      type: 'directory',
      name: 'directory',
      message: 'select directory',
      basePath: './src/ui',
      when: answers => answers.baseDir === 'ui',
    },
    {
      type: 'directory',
      name: 'directory',
      message: 'select directory',
      basePath: './src/app',
      when: answers => answers.baseDir === 'app',
    },
    {
      type: 'input',
      name: 'name',
      message: 'component name',
    },
  ],
  actions: function(data) {
    const actions = [
      {
        type: 'add',
        path: `src/${data.baseDir}/{{directory}}/{{camelCase name}}/{{pascalCase name}}.tsx`,
        templateFile: 'plop-templates/component/Component.hbs',
      },
      {
        type: 'add',
        path: `src/${data.baseDir}/{{directory}}/{{camelCase name}}/{{pascalCase name}}.test.tsx`,
        templateFile: 'plop-templates/component/Component.test.hbs',
      },
      {
        type: 'add',
        path: `src/${data.baseDir}/{{directory}}/{{camelCase name}}/{{pascalCase name}}.types.ts`,
        templateFile: 'plop-templates/component/Component.types.hbs',
      },
      {
        type: 'modify',
        path: 'src/ui/index.ts',
        pattern: 'export',
        templateFile: 'plop-templates/component/Component.index.hbs',
        skip() {
          if (data.baseDir !== 'ui') {
            return 'Skipped adding export to src/ui/index.ts';
          }
        },
      },
    ];

    return actions;
  },
});

const apiActionsGenerator = () => ({
  description: componentTypes.API_ACTIONS,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'action name',
    },
  ],
  actions: function() {
    const actions = [
      {
        type: 'add',
        path: 'src/api/actions/{{camelCase name}}/{{camelCase name}}.mutations.ts',
        templateFile: 'plop-templates/apiActions/apiActions.mutations.hbs',
      },
      {
        type: 'add',
        path: 'src/api/actions/{{camelCase name}}/{{camelCase name}}.queries.ts',
        templateFile: 'plop-templates/apiActions/apiActions.queries.hbs',
      },
      {
        type: 'add',
        path: 'src/api/actions/{{camelCase name}}/{{camelCase name}}.types.ts',
        templateFile: 'plop-templates/apiActions/apiActions.types.hbs',
      },
      {
        type: 'modify',
        path: 'src/api/actions/index.ts',
        pattern: 'export const queries = {',
        templateFile: 'plop-templates/apiActions/apiActions.index.queries.hbs',
      },
      {
        type: 'modify',
        path: 'src/api/actions/index.ts',
        pattern: 'export const mutations = {',
        templateFile: 'plop-templates/apiActions/apiActions.index.mutations.hbs',
      },
      {
        type: 'modify',
        path: 'src/api/actions/index.ts',
        pattern: 'import',
        templateFile: 'plop-templates/apiActions/apiActions.index.imports.hbs',
      },
    ];

    return actions;
  },
});

module.exports = function(plop) {
  plop.setPrompt('directory', promptDirectory);
  plop.setGenerator(componentTypes.REACT_COMPONENT, reactComponentGenerator());
  plop.setGenerator(componentTypes.CUSTOM_HOOK, customHookGenerator());
  plop.setGenerator(componentTypes.API_ACTIONS, apiActionsGenerator());
};
