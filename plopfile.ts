import { NodePlopAPI } from '@crutchcorn/plop';
import promptDirectory from 'inquirer-directory';

declare module 'inquirer-directory' {
  type test = unknown;
}

import { componentTypes } from './plop/constants';
import {
  appComponentGenerator,
  appContainerComponentGenerator,
  uiComponentGenerator,
  customHookGenerator,
  apiActionsGenerator,
  apiQueryGenerator,
  apiMutationGenerator,
  contextGenerator,
} from './plop/generators';

export default function (plop: NodePlopAPI) {
  const toKebabCase = plop.getHelper('kebabCase');

  plop.setPrompt('directory', promptDirectory);
  plop.setGenerator(componentTypes.REACT_APP_COMPONENT, appComponentGenerator);
  plop.setGenerator(componentTypes.REACT_APP_CONTAINER_COMPONENT, appContainerComponentGenerator);
  plop.setGenerator(componentTypes.REACT_UI_COMPONENT, uiComponentGenerator);
  plop.setGenerator(componentTypes.CUSTOM_HOOK, customHookGenerator);
  plop.setGenerator(componentTypes.API_ACTIONS, apiActionsGenerator);
  plop.setGenerator(componentTypes.API_QUERY, apiQueryGenerator(toKebabCase));
  plop.setGenerator(componentTypes.API_MUTATION, apiMutationGenerator(toKebabCase));
  plop.setGenerator(componentTypes.REACT_CONTEXT, contextGenerator);
};
