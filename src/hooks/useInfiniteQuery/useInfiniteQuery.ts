import {
  QueryKey,
  useInfiniteQuery as useRQInfiniteQuery,
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryFunction,
} from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { useApiClient } from 'hooks/useApiClient/useApiClient';
import { ExtendedQueryMeta } from 'api/types/types';
import { StandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

/**
 * Fetching data using this hook doesn't require specifying query function like it's required in react-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook uses proper querying strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */
export const useInfiniteQuery = <TQueryFnData = unknown, TError = StandardizedApiError, TPageParam = unknown>(
  params: Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TQueryFnData>, TQueryFnData, QueryKey, TPageParam>,
    'queryFn'
  > & {
    meta?: Partial<ExtendedQueryMeta>;
    queryFn: (client: AxiosInstance) => QueryFunction<TQueryFnData, QueryKey, TPageParam>;
  },
) => {
  const { client } = useApiClient();
  const { queryFn, ...options } = params;

  return useRQInfiniteQuery({
    ...options,
    queryFn: queryFn(client),
  });
};
