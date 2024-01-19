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
import { reactContextGeneratorDescription, reactContextGenerator } from './plop/generators/reactContext.mjs';

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
  plop.setGenerator(reactContextGeneratorDescription, reactContextGenerator);
};
