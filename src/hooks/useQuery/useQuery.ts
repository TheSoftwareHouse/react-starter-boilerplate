import { stringify } from 'qs';
import { QueryFunction, QueryKey, useQuery as useRQQuery, UseQueryResult } from 'react-query';
import { useCallback } from 'react';

import { useClient } from '../useClient/useClient';

import { QueryFn, UseQueryOptions } from './useQuery.types';

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
export const useQuery = <TParams = unknown, TError = unknown, TData = unknown>(
  queryKey: QueryKey,
  action: QueryFn<TParams, TData>,
  options?: UseQueryOptions<TParams, TError, TData>,
): UseQueryResult<TData, TError> => {
  const client = useClient();

  const { endpoint } = action(options?.params);

  const queryFn: QueryFunction<TParams> = useCallback(() => {
    return client.get(getUrl(endpoint, options?.params));
  }, [client, endpoint, options?.params]);

  return useRQQuery<TParams, TError, TData, QueryKey>(queryKey, queryFn, {
    ...options,
  });
};
