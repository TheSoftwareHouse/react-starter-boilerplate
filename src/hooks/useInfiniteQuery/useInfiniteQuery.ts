import { stringify } from 'qs';
import { QueryFunction, QueryKey, useInfiniteQuery as useRQInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { useCallback } from 'react';

import { useClient } from '../useClient/useClient';

import { InfiniteQueryFn, UseInfiniteQueryConfigParameters, UseInfiniteQueryOptions } from './useInfiniteQuery.types';

function getUrl<TParams>(path: string, params?: TParams) {
  let url = path;

  if (params && Object.keys(params).length > 0) {
    url = url + '?' + stringify(params);
  }

  return url;
}
/**
 * Fetching data via this hook will not require specifying client in each query function, as it is required in React-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook will automatically use client from ClientContext e.g Axios
 * @see ClientContext.ts
 * */
export const useInfiniteQuery = <TParams = unknown, TError = unknown, TResponse = TParams>(
  queryKey: QueryKey,
  query: InfiniteQueryFn<TParams, TResponse>,
  options?: UseInfiniteQueryOptions<TParams, TError, TResponse>,
): UseInfiniteQueryResult<TResponse, TError> => {
  const client = useClient();

  const { endpoint } = query(options?.params);

  const queryFn: QueryFunction<UseInfiniteQueryConfigParameters<TParams>> = useCallback(() => {
    return client.get(getUrl(endpoint));
  }, [client, endpoint]);

  return useRQInfiniteQuery<UseInfiniteQueryConfigParameters<TParams>, TError, TResponse, QueryKey>(queryKey, queryFn, {
    ...options?.params,
  });
};
