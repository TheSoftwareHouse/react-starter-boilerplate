import { QueryFunction, QueryKey, useInfiniteQuery as useRQInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { useCallback } from 'react';
import { stringify } from 'qs';

import { useClient } from '../useClient/useClient';

import { InfiniteQueryFn, UseInfiniteQueryOptions } from './useInfiniteQuery.types';

/**
 * Fetching data via this hook will not require specifying client in each query function, as it is required in React-query
 * @see https://react-query.tanstack.com/guides/query-functions
 * This hook will automatically use client from ClientContext e.g Axios
 * @see ClientContext.ts
 * */
export const useInfiniteQuery = <TArgs = unknown, TParams = unknown, TError = unknown, TResponse = TParams>(
  queryKey: QueryKey,
  query: InfiniteQueryFn<TArgs, TParams, TResponse>,
  options?: UseInfiniteQueryOptions<TArgs, TParams, TError, TResponse>,
): UseInfiniteQueryResult<TResponse, TError> => {
  const client = useClient();

  const { endpoint, args } = query(options?.args);

  const queryFn: QueryFunction<TParams> = useCallback(
    ({ pageParam = 0 }) => {
      const cursorKey = options?.cursorKey;
      // End format of url is e.g /users?page=2&sortOrder=ASC&limit=5&sortBy=name
      return client.get(`${endpoint}?${cursorKey}=${pageParam}&${stringify(args, { addQueryPrefix: false })}`);
    },
    [args, client, endpoint, options?.cursorKey],
  );

  return useRQInfiniteQuery<TParams, TError, TResponse, QueryKey>(queryKey, queryFn, {
    ...options,
  });
};
