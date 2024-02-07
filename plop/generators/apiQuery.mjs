import { getDirectoriesList, getPlaceholderPattern } from '../utils.mjs';

const API_ACTIONS_COLLECTIONS_LIST = getDirectoriesList(`./src/api/actions`);

export const apiQueryGeneratorDescription = 'API query';

export const apiQueryGenerator = (toKebabCase) => ({
  description: apiQueryGeneratorDescription,
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
        templateFile: 'plop/templates/apiQuery/apiQuery.types.hbs',
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
        templateFile: 'plop/templates/apiQuery/apiQuery.hbs',
      }
    ]
  }
});
