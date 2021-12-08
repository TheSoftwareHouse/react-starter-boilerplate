import { ClientResponse } from 'api/types/types';
import { MutationFn } from 'hooks/useMutation/useMutation.types';
import { InfiniteQueryFn } from 'hooks/useInfiniteQuery/useInfiniteQuery.types';

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

export const getInfiniteUsersQuery: InfiniteQueryFn<{ count: number }, ClientResponse<GetUsersResponse>> = (args) => {
  return {
    endpoint: `/users`,
    args,
  };
};
