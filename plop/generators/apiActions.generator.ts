import { PlopGeneratorConfig } from '@crutchcorn/plop';

import { componentTypes } from '../constants';
import { getPlaceholderPattern } from '../utils';

export const apiActionsGenerator: PlopGeneratorConfig = {
  description: componentTypes.API_ACTIONS,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'actions collection name',
      validate: input => input.length > 1 || 'Actions collection name cannot be empty!',
    },
  ],
  actions: [
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
      template: '...{{camelCase name}}Queries,\n  $1',
    },
    {
      type: 'modify',
      path: 'src/api/actions/index.ts',
      pattern: getPlaceholderPattern('API_COLLECTION_MUTATIONS'),
      template: '...{{camelCase name}}Mutations,\n  $1',
    },
  ],
};
