/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  QueryKey,
  useInfiniteQuery as useRQInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { useApiClient } from 'hooks/useApiClient/useApiClient';
import { AxiosInfiniteQueriesType, queries } from 'api/actions';
import { DataForQuery, ExtendedQueryMeta, GetQueryParams } from 'api/types/types';
import { ApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

/**
 * Fetching data using this hook doesn't require specifying query function like it's required in react-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook uses proper querying strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */
export const useInfiniteQuery = <Key extends keyof AxiosInfiniteQueriesType, TError = ApiError>(
  query: Key,
  args?: GetQueryParams<Key>,
  options?: UseInfiniteQueryOptions<DataForQuery<Key>, TError> & { meta?: Partial<ExtendedQueryMeta> },
) => {
  const { client } = useApiClient();
  const queryFn = queries[query](client);
  const queryKey: QueryKey = [query];

  return useRQInfiniteQuery(
    queryKey,
    async ({ pageParam }: { pageParam?: string }) =>
      (await queryFn({ pageParam, ...(args || {}) })) as DataForQuery<Key>,
    options,
  ) as UseInfiniteQueryResult<DataForQuery<Key>, TError>;
};
