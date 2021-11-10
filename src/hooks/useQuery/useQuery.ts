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

export const useQuery = <TParams = unknown, TError = unknown, TData = unknown>(
  action: QueryFn<TParams, TData>,
  options: UseQueryOptions<TParams, TError, TData>,
): UseQueryResult<TData, TError> => {
  const client = useClient();
  const { params, ...reactQueryOptions } = options;

  const { name, endpoint } = action(params);

  const queryKey: QueryKey = [name, endpoint, params];

  const queryFn: QueryFunction<TParams> = useCallback(() => {
    return client.get(getUrl(endpoint, params));
  }, [client, endpoint, params]);

  return useRQQuery<TParams, TError, TData, QueryKey>(queryKey, queryFn, {
    ...reactQueryOptions,
  });
};
