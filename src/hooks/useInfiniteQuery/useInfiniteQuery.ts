import { QueryKey, useInfiniteQuery as useRQInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { useMemo } from 'react';

import { useApiClient } from 'hooks/useApiClient/useApiClient';
import { ApiResponse } from 'context/apiClient/apiClientContext/ApiClientContext.types';

import { InfiniteQueryFn, UseInfiniteQueryOptions } from './useInfiniteQuery.types';

/**
 * Fetching data using this hook doesn't require specifying query function like it's required in react-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook uses proper querying strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */
export const useInfiniteQuery = <
  TArgs = unknown,
  TParams = unknown,
  TError = unknown,
  TResponse = ApiResponse<TParams>,
>(
  queryKey: QueryKey,
  query: InfiniteQueryFn<TArgs, ApiResponse<TParams>, TResponse>,
  options?: UseInfiniteQueryOptions<TArgs, ApiResponse<TParams>, TError, TResponse>,
): UseInfiniteQueryResult<TResponse, TError> => {
  const { infiniteQueryFn } = useApiClient();
  const _infiniteQueryFn = useMemo(
    () => infiniteQueryFn<TArgs, TParams, TResponse, TError>(query, options),
    [infiniteQueryFn, query, options],
  );

  return useRQInfiniteQuery<ApiResponse<TParams>, TError, TResponse, QueryKey>(queryKey, _infiniteQueryFn, options);
};
