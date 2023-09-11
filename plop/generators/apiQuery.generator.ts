import { PlopGeneratorConfig } from '@crutchcorn/plop';

import { componentTypes } from '../constants';
import { apiActionCollectionChoices, apiActionCollectionDefaultChoice, getPlaceholderPattern } from '../utils';

export const apiQueryGenerator = (toKebabCase: Function): PlopGeneratorConfig => ({
  description: componentTypes.API_QUERY,
  prompts: [
    {
      type: "list",
      name: "collection",
      message: "API actions collection name?",
      default: apiActionCollectionDefaultChoice,
      choices: apiActionCollectionChoices,
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
      default: (answers: { collection: string; name: string }) => `/${answers.collection}/${toKebabCase(answers.name)}`,
      validate: input => input.length > 1 || 'API query action path cannot be empty!',
    },
  ],
  actions: [
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
  ],
});
