import { stringify } from 'qs';
import { QueryKey, useQueries as useRQQueries, UseQueryResult } from 'react-query';
import { useCallback, useMemo } from 'react';
import { UseQueryOptions } from 'react-query/types/react/types';

import { useClient } from '../useClient/useClient';

import { UseQueriesMappedOption, UseQueriesOptions } from './useQueries.types';

function getUrl<TParams>(path: string, params?: TParams) {
  let url = path;

  if (params && Object.keys(params).length > 0) {
    url = url + '?' + stringify(params);
  }

  return url;
}
/**
 * @IMPORTANT Work in progress
 * Fetching data via this hook will not require specifying client in each query function, as it is required in React-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook will automatically use client from ClientContext e.g Axios
 * @see ClientContext.ts
 * */
export const useQueries = <TParams = unknown, TError = unknown, TData = unknown>(
  arrOfOptions: UseQueriesOptions[],
): UseQueryResult<TData, TError>[] => {
  const client = useClient();

  const mappedOptions = useMemo<UseQueriesMappedOption<TParams, TError, TData>[]>(() => {
    return arrOfOptions.map(({ query, queryKey, options }) => {
      const { endpoint } = query(options);
      return {
        queryKey: queryKey,
        queryFn: () => client.get(getUrl(endpoint, options?.params)),
        options: { ...options },
      };
    });
  }, [arrOfOptions, client]);

  return useRQQueries<>(mappedOptions);
};
