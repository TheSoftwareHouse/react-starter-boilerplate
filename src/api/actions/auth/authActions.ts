import {Mutation, MutationFn} from '../../types/types';

import { LoginActionArguments } from './authActions.types';

export const loginAction = (body: LoginActionArguments): Mutation<any> => {
  return {
    endpoint: '/authorize',
    method: 'POST',
    params: {
      ...body,
    },
  };
};
