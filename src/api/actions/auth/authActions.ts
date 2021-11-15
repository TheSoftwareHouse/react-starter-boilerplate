import { MutationFn } from '../../../hooks/useMutation/useMutation.types';
import { ClientResponse } from '../../types/types';
import { InfiniteQueryFn } from '../../../hooks/useInfiniteQuery/useInfiniteQuery.types';

import { GetUsersResponse, LoginMutationArguments, LoginMutationResponse } from './authActions.types';

export const loginMutation: MutationFn<LoginMutationArguments, ClientResponse<LoginMutationResponse>> = (body) => {
  return {
    endpoint: '/authorize',
    method: 'POST',
    params: {
      ...body,
    },
  };
};

export const getInfiniteUsersQuery: InfiniteQueryFn<unknown, ClientResponse<GetUsersResponse>> = (config) => {
  return {
    endpoint: `/users?${config?.pageKey}=${config?.pageParam}`,
    params: config?.params,
  };
};
