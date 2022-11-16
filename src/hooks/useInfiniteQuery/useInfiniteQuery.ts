/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  QueryKey,
  useInfiniteQuery as useRQInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { useApiClient } from 'hooks/useApiClient/useApiClient';
import { AxiosQueriesType, queries } from 'api/actions';
import { DataForQuery, GetQueryParams } from 'api/types/types';

/**
 * Fetching data using this hook doesn't require specifying query function like it's required in react-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook uses proper querying strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */
export const useInfiniteQuery = <Key extends keyof AxiosQueriesType, TError = unknown>(
  query: Key,
  args?: GetQueryParams<Key>,
  options?: UseInfiniteQueryOptions<DataForQuery<Key>, TError>,
) => {
  const { client } = useApiClient();
  const queryFn = queries[query](client);
  const queryKey: QueryKey = [query];

  return useRQInfiniteQuery(
    queryKey,
    async ({ pageParam }: { pageParam?: string }) => await queryFn({ pageParam, ...(args || {}) }),
    options as any,
  ) as UseInfiniteQueryResult<DataForQuery<Key>, TError>;
};
