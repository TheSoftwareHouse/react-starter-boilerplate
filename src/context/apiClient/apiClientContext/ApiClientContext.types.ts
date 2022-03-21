import { MutationFunction, QueryFunction } from 'react-query';

import { MutationFn } from 'hooks/useMutation/useMutation.types';
import { InfiniteQueryFn, UseInfiniteQueryOptions } from '../../../hooks/useInfiniteQuery/useInfiniteQuery.types';

export type ApiClientContextValue = {
  queryFn: QueryFunction;
  mutationFn: <TParams, TData>(mutation: MutationFn<TParams, TData>) => MutationFunction<TData, TParams>;
  infiniteQueryFn: <TArgs, TParams, TResponse, TError>(
    _query: InfiniteQueryFn<TArgs, TParams, TResponse>,
    options?: UseInfiniteQueryOptions<TArgs, TParams, TError, TResponse>,
  ) => QueryFunction<TParams>;
};
