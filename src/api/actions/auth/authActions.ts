import { MutationFn } from '../../../hooks/useMutation/useMutation.types';
import { ClientResponse } from '../../types/types';

import { LoginMutationArguments, LoginMutationResponse } from './authActions.types';

export const loginMutation: MutationFn<LoginMutationArguments, ClientResponse<LoginMutationResponse>> = (body) => {
  return {
    endpoint: '/authorize',
    method: 'POST',
    params: {
      ...body,
    },
  };
};
