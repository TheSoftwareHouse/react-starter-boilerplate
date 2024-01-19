import { getDirectoriesList, getPlaceholderPattern } from '../utils.mjs';

const API_ACTIONS_COLLECTIONS_LIST = getDirectoriesList(`./src/api/actions`);

export const apiMutationGeneratorDescription = 'API mutation';

export const apiMutationGenerator = (toKebabCase) => ({
  description: apiMutationGeneratorDescription,
  prompts: [
    {
      type: "list",
      name: "collection",
      message: "API actions collection name?",
      default: API_ACTIONS_COLLECTIONS_LIST[0],
      choices: API_ACTIONS_COLLECTIONS_LIST.map((collection) => ({ name: collection, value: collection })),
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
        templateFile: 'plop/templates/apiMutation/apiMutation.types.hbs',
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
        templateFile: 'plop/templates/apiMutation/apiMutation.hbs',
      }
    ]
  }
});
