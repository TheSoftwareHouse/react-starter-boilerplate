import {
  QueryKey,
  useInfiniteQuery as useRQInfiniteQuery,
  UseInfiniteQueryOptions,
  InfiniteData,
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
export const useInfiniteQuery = <Key extends keyof AxiosInfiniteQueriesType, TError = ApiError>({
  query,
  args,
  options,
}: {
  query: Key;
  args?: GetQueryParams<Key>;
  options: Omit<
    UseInfiniteQueryOptions<
      DataForQuery<Key>,
      TError,
      InfiniteData<DataForQuery<Key>>,
      DataForQuery<Key>,
      QueryKey,
      string
    >,
    'queryKey' | 'queryFn'
  > & {
    meta?: Partial<ExtendedQueryMeta>;
  };
}) => {
  const { client } = useApiClient();
  const queryFn = queries[query](client);
  const queryKey: QueryKey = [query];

  return useRQInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }: { pageParam: string }) =>
      (await queryFn({ pageParam, ...(args || {}) })) as DataForQuery<Key>,
    ...options,
  });
};
