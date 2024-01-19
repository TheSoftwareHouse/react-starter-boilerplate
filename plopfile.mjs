import * as promptDirectory from 'inquirer-directory';

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
import { apiQueryGeneratorDescription, apiQueryGenerator } from './plop/generators/apiQuery.mjs';
import { apiMutationGeneratorDescription, apiMutationGenerator } from './plop/generators/apiMutation.mjs';

const componentTypes = {
  API_MUTATION: '',
  REACT_CONTEXT: 'React Context',
};

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
  plop.setGenerator(apiQueryGeneratorDescription, apiQueryGenerator(toKebabCase));
  plop.setGenerator(apiMutationGeneratorDescription, apiMutationGenerator(toKebabCase));
  plop.setGenerator(componentTypes.REACT_CONTEXT, reactContextGenerator());
};
