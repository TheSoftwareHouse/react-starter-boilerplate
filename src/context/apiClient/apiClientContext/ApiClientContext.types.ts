import { MutationFunction, QueryFunction } from 'react-query';

import { MutationFn } from 'hooks/useMutation/useMutation.types';
import { InfiniteQueryFn, UseInfiniteQueryOptions } from 'hooks/useInfiniteQuery/useInfiniteQuery.types';

export type ApiResponse<TData = unknown, TConfig = unknown> = {
  data: TData;
  config: TConfig | null;
};

export type ApiClientContextValue = {
  queryFn: <TData>() => QueryFunction<ApiResponse<TData>>;
  mutationFn: <TParams, TData>(
    mutation: MutationFn<TParams, ApiResponse<TData>>,
  ) => MutationFunction<ApiResponse<TData>, TParams>;
  infiniteQueryFn: <TArgs, TParams, TResponse, TError>(
    query: InfiniteQueryFn<TArgs, ApiResponse<TParams>, TResponse>,
    options?: UseInfiniteQueryOptions<TArgs, ApiResponse<TParams>, TError, TResponse>,
  ) => QueryFunction<ApiResponse<TParams>>;
};
