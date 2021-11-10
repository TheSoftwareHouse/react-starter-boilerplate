import { MutationFn } from '../../../hooks/useMutation/useMutation.types';
import { ClientResponse } from '../../types/types';

import { LoginActionArguments, LoginActionResponse } from './authActions.types';

export const loginMutation: MutationFn<LoginActionArguments, ClientResponse<LoginActionResponse>> = (body) => {
  return {
    endpoint: '/authorize',
    method: 'POST',
    params: {
      ...body,
    },
  };
};
