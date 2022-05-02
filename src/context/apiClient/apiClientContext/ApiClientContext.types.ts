import { MutationFunction, QueryFunction } from 'react-query';

import { MutationFn } from 'hooks/useMutation/useMutation.types';
import { InfiniteQueryFn, UseInfiniteQueryOptions } from 'hooks/useInfiniteQuery/useInfiniteQuery.types';

export type ApiResponse<TData = unknown, TConfig = unknown> = {
  data: TData;
  config: TConfig | null;
};

export type ApiClientContextValue = {
  queryFn: <TData>() => QueryFunction<TData>;
  mutationFn: <TParams, TData>(mutation: MutationFn<TParams, TData>) => MutationFunction<TData, TParams>;
  infiniteQueryFn: <TArgs, TParams, TResponse, TError>(
    query: InfiniteQueryFn<TArgs, TParams, TResponse>,
    options?: UseInfiniteQueryOptions<TArgs, TParams, TError, TResponse>,
  ) => QueryFunction<TParams>;
};
