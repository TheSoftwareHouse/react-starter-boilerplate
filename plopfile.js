/* eslint-disable @typescript-eslint/no-var-requires */
const promptDirectory = require('inquirer-directory');
const { readdirSync, lstatSync } = require('fs');
const path = require('path');

const componentTypes = {
  REACT_COMPONENT: 'React component',
  CUSTOM_HOOK: 'Custom hook',
  API_ACTIONS: 'API actions collection',
  API_QUERY: 'API query',
  API_MUTATION: 'API mutation',
  REACT_CONTEXT: 'React Context',
};

const isDirectory = (source) => lstatSync(source).isDirectory();

const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => path.join(source, name))
    .filter(isDirectory);

const NAME_REGEX = /[^\/]+$/;

const apiActionCollections = getDirectories(`./src/api/actions`)
  .map(collection => NAME_REGEX.exec(collection)[0].trimStart().trimEnd());

const getPlaceholderPattern = (pattern) => new RegExp(`(\/\/ ${pattern})`, 's');

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
      message: 'actions collection name',
    },
  ],
  actions: function() {
    return [
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
        pattern: getPlaceholderPattern('API_COLLECTION_IMPORTS'),
        template:
          'import { {{camelCase name}}Mutations } from \'./{{camelCase name}}/{{camelCase name}}.mutations\';\nimport { {{camelCase name}}Queries } from \'./{{camelCase name}}/{{camelCase name}}.queries\';\n$1',
      },
      {
        type: 'modify',
        path: 'src/api/actions/index.ts',
        pattern: getPlaceholderPattern('API_COLLECTION_QUERIES'),
        template: '...{{camelCase name}}Queries,\n\t$1',
      },
      {
        type: 'modify',
        path: 'src/api/actions/index.ts',
        pattern: getPlaceholderPattern('API_COLLECTION_MUTATIONS'),
        template: '...{{camelCase name}}Mutations,\n\t$1',
      },
    ];
  },
});

const apiQueryGenerator = () => ({
  description: componentTypes.API_QUERY,
  prompts: [
    {
      type: "list",
      name: "collection",
      message: "API actions collection name?",
      default: apiActionCollections[0],
      choices: apiActionCollections.map((collection) => ({ name: collection, value: collection })),
    },
    {
      type: 'input',
      name: 'name',
      message: 'API query action name?',
    },
    {
      type: 'input',
      name: 'path',
      message: 'API query action path?',
    },
  ],
  actions: function() {
    return [
      {
        type: 'modify',
        path: 'src/api/actions/{{collection}}/{{collection}}.types.ts',
        pattern: getPlaceholderPattern('API_ACTION_TYPES'),
        templateFile: 'plop-templates/apiQuery/apiQuery.types.hbs',
      },
      {
        type: 'modify',
        path: 'src/api/actions/{{collection}}/{{collection}}.queries.ts',
        pattern: getPlaceholderPattern('QUERY_TYPE_IMPORTS'),
        template: '{{pascalCase name}}Payload,\n\t{{pascalCase name}}Response,\n\t$1',
      },
      {
        type: 'modify',
        path: 'src/api/actions/{{collection}}/{{collection}}.queries.ts',
        pattern: getPlaceholderPattern('QUERY_FUNCTIONS_SETUP'),
        templateFile: 'plop-templates/apiQuery/apiQuery.hbs',
      }
    ]
  }
});

const apiMutationGenerator = () => ({
  description: componentTypes.API_MUTATION,
  prompts: [
    {
      type: "list",
      name: "collection",
      message: "API actions collection name?",
      default: apiActionCollections[0],
      choices: apiActionCollections.map((collection) => ({ name: collection, value: collection })),
    },
    {
      type: 'input',
      name: 'name',
      message: 'API query action name?',
    },
    {
      type: 'input',
      name: 'path',
      message: 'API query action path?',
    },
    {
      type: "list",
      name: "method",
      message: "Mutation action method?",
      default: "post",
      choices: [
        { name: "post", value: "post" },
        { name: "delete", value: "delete" },
        { name: "patch", value: "patch" },
        { name: "put", value: "put" },
      ],
    }
  ],
  actions: function() {
    return [
      {
        type: 'modify',
        path: 'src/api/actions/{{collection}}/{{collection}}.types.ts',
        pattern: getPlaceholderPattern('API_ACTION_TYPES'),
        templateFile: 'plop-templates/apiMutation/apiMutation.types.hbs',
      },
      {
        type: 'modify',
        path: 'src/api/actions/{{collection}}/{{collection}}.mutations.ts',
        pattern: getPlaceholderPattern('MUTATION_TYPE_IMPORTS'),
        template: '{{pascalCase name}}Payload,\n\t{{pascalCase name}}Response,\n\t$1',
      },
      {
        type: 'modify',
        path: 'src/api/actions/{{collection}}/{{collection}}.mutations.ts',
        pattern: getPlaceholderPattern('MUTATION_FUNCTIONS_SETUP'),
        templateFile: 'plop-templates/apiMutation/apiMutation.hbs',
      }
    ]
  }
});

const reactContextGenerator = () => (
  {
    description: componentTypes.REACT_CONTEXT,
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'context name',
      }
    ],
    actions: function() {
      return [
        {
          type: 'add',
          path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.ts',
          templateFile: 'plop-templates/context/Context.hbs',
        },
        {
          type: 'add',
          path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.types.ts',
          templateFile: 'plop-templates/context/Context.types.hbs',
        },
        {
          type: 'add',
          path: 'src/context/{{camelCase name}}/{{camelCase name}}Context/{{pascalCase name}}Context.test.tsx',
          templateFile: 'plop-templates/context/Context.test.hbs',
        },
        {
          type: 'add',
          path: 'src/context/{{camelCase name}}/{{camelCase name}}ContextController/{{pascalCase name}}ContextController.tsx',
          templateFile: 'plop-templates/context/ContextController.hbs',
        },
        {
          type: 'add',
          path: 'src/context/{{camelCase name}}/{{camelCase name}}ContextController/{{pascalCase name}}ContextController.types.ts',
          templateFile: 'plop-templates/context/ContextController.types.hbs',
        },
        {
          type: 'add',
          path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.ts',
          templateFile: 'plop-templates/context/useContext.hbs',
        },
        {
          type: 'add',
          path: 'src/hooks/use{{pascalCase name}}/use{{pascalCase name}}.test.tsx',
          templateFile: 'plop-templates/context/useContext.test.hbs',
        },
      ];
    }
  }
);

module.exports = function(plop) {
  plop.setPrompt('directory', promptDirectory);
  plop.setGenerator(componentTypes.REACT_COMPONENT, reactComponentGenerator());
  plop.setGenerator(componentTypes.CUSTOM_HOOK, customHookGenerator());
  plop.setGenerator(componentTypes.API_ACTIONS, apiActionsGenerator());
  plop.setGenerator(componentTypes.API_QUERY, apiQueryGenerator());
  plop.setGenerator(componentTypes.API_MUTATION, apiMutationGenerator());
  plop.setGenerator(componentTypes.REACT_CONTEXT, reactContextGenerator());
};
