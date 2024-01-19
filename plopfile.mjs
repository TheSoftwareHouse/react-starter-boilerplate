import * as promptDirectory from 'inquirer-directory';
import { getDirectoriesList, getPlaceholderPattern } from './plop/utils.mjs';
import { customHookGeneratorDescription, customHookGenerator } from './plop/generators/customHook.mjs';
import {
  reactAppComponentGeneratorDescription,
  reactAppComponentGenerator,
} from './plop/generators/reactAppComponent.mjs';
import {
  reactUiComponentGeneratorDescription,
  reactUiComponentGenerator,
} from './plop/generators/reactUiComponent.mjs';
import {
  reactContainerComponentGeneratorDescription,
  reactContainerComponentGenerator,
} from './plop/generators/reactContainerComponent.mjs';
import {
  apiActionsCollectionGeneratorDescription,
  apiActionsCollectionGenerator,
} from './plop/generators/apiActionsCollection.mjs';

const componentTypes = {
  API_QUERY: 'API query',
  API_MUTATION: 'API mutation',
  REACT_CONTEXT: 'React Context',
};

const apiActionCollections = getDirectoriesList(`./src/api/actions`);

const apiQueryGenerator = (toKebabCase) => ({
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
      validate: input => input.length > 1 || 'API query action name cannot be empty!',
    },
    {
      type: 'input',
      name: 'path',
      message: 'API query action path?',
      default: (answers) => `/${answers.collection}/${toKebabCase(answers.name)}`,
      validate: input => input.length > 1 || 'API query action path cannot be empty!',
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
        template: '{{pascalCase name}}Payload,\n  {{pascalCase name}}Response,\n  $1',
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

const apiMutationGenerator = (toKebabCase) => ({
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
      message: 'API mutation action name?',
      validate: input => input.length > 1 || 'API mutation action name cannot be empty!',
    },
    {
      type: 'input',
      name: 'path',
      message: 'API mutation action path?',
      default: (answers) => `/${answers.collection}/${toKebabCase(answers.name)}`,
      validate: input => input.length > 1 || 'API mutation action path cannot be empty!',
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
        template: '{{pascalCase name}}Payload,\n  {{pascalCase name}}Response,\n  $1',
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

const reactContextGenerator = () => ({
  description: componentTypes.REACT_CONTEXT,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'context name',
      validate: input => input.length > 1 || 'Context name cannot be empty!',
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
});

export default function(plop) {
  const toKebabCase = plop.getHelper('kebabCase');

  plop.setPrompt('directory', promptDirectory);
  plop.setGenerator(reactAppComponentGeneratorDescription, reactAppComponentGenerator);
  plop.setGenerator(reactContainerComponentGeneratorDescription, reactContainerComponentGenerator);
  plop.setGenerator(reactUiComponentGeneratorDescription, reactUiComponentGenerator);
  plop.setGenerator(customHookGeneratorDescription, customHookGenerator);
  plop.setGenerator(apiActionsCollectionGeneratorDescription, apiActionsCollectionGenerator);
  plop.setGenerator(componentTypes.API_QUERY, apiQueryGenerator(toKebabCase));
  plop.setGenerator(componentTypes.API_MUTATION, apiMutationGenerator(toKebabCase));
  plop.setGenerator(componentTypes.REACT_CONTEXT, reactContextGenerator());
};
