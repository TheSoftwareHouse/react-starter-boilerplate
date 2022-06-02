import { MutationFn } from 'hooks/useMutation/useMutation.types';
import { InfiniteQueryFn } from 'hooks/useInfiniteQuery/useInfiniteQuery.types';

import { GetUsersResponse, LoginMutationArguments, LoginMutationResponse } from './authActions.types';

export const loginMutation: MutationFn<LoginMutationArguments, LoginMutationResponse> = (body) => {
  return {
    endpoint: 'authorize',
    method: 'POST',
    params: {
      ...body,
    },
  };
};

export const getInfiniteUsersQuery: InfiniteQueryFn<{ count: number }, GetUsersResponse> = (args) => {
  return {
    endpoint: `users`,
    args,
  };
};
