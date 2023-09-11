import { PlopGeneratorConfig } from '@crutchcorn/plop';

import { componentTypes } from '../constants';

export const appComponentGenerator: PlopGeneratorConfig = {
  description: componentTypes.REACT_APP_COMPONENT,
  prompts: [
    {
      type: 'directory',
      name: 'directory',
      message: 'select directory',
      basePath: './src/app',
    } as any,
    {
      type: 'input',
      name: 'name',
      message: 'component name',
      validate: input => input.length > 1 || 'Component name cannot be empty!',
    },
  ],
  actions: [
    {
      type: 'add',
      path: `src/app/{{directory}}/{{camelCase name}}/{{pascalCase name}}.tsx`,
      templateFile: 'plop-templates/component/Component.hbs',
    },
    {
      type: 'add',
      path: `src/app/{{directory}}/{{camelCase name}}/{{pascalCase name}}.test.tsx`,
      templateFile: 'plop-templates/component/Component.test.hbs',
    },
    {
      type: 'add',
      path: `src/app/{{directory}}/{{camelCase name}}/{{pascalCase name}}.types.ts`,
      templateFile: 'plop-templates/component/Component.types.hbs',
    },
  ],
};
