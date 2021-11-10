import { MutationFn } from '../../../hooks/useMutation/useMutation.types';
import { ClientResponse } from '../../types/types';
import { QueryFn } from '../../../hooks/useQuery/useQuery.types';

import { GetMeQueryResponse, LoginMutationArguments, LoginMutationResponse } from './authActions.types';

export const loginMutation: MutationFn<LoginMutationArguments, ClientResponse<LoginMutationResponse>> = (body) => {
  return {
    endpoint: '/authorize',
    method: 'POST',
    params: {
      ...body,
    },
  };
};

export const getMeQuery: QueryFn<unknown, ClientResponse<GetMeQueryResponse>> = () => {
  return {
    endpoint: '/me',
  };
};
