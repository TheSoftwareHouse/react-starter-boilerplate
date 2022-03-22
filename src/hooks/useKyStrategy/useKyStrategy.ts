import { useCallback, useMemo } from 'react';
import Ky, { Options } from 'ky';
import { MutationFunction, QueryFunction } from 'react-query';
import { stringify } from 'qs';

import { ApiClientContextValue, ApiResponse } from 'context/apiClient/apiClientContext/ApiClientContext.types';
import { MutationFn } from 'hooks/useMutation/useMutation.types';
import { InfiniteQueryFn, UseInfiniteQueryOptions } from 'hooks/useInfiniteQuery/useInfiniteQuery.types';

import { requestSuccessHook } from './kyHooks/requestHooks';
import { responseErrorHook } from './kyHooks/responseHooks';

export const useKyStrategy = (): ApiClientContextValue => {
  const client = useMemo(() => {
    return Ky.create({
      headers: {
        'Content-Type': 'application/json',
      },
      prefixUrl: `${process.env.REACT_APP_API_URL}`,
      hooks: {
        beforeRequest: [requestSuccessHook],
        beforeError: [responseErrorHook],
      },
      retry: 1,
    });
  }, []);

  const queryFn: QueryFunction<ApiResponse> = useCallback(
    async ({ queryKey: [url] }) => {
      if (typeof url === 'string') {
        const lowerCaseUrl = url.toLowerCase();
        const res = await client.get(lowerCaseUrl).json();
        return {
          data: res,
          config: null,
        };
      }
      throw new Error('Invalid QueryKey');
    },
    [client],
  );

  const infiniteQueryFn = useCallback(
    <TArgs, TParams, TResponse, TError>(
        _query: InfiniteQueryFn<TArgs, ApiResponse<TParams>, TResponse>,
        options?: UseInfiniteQueryOptions<TArgs, ApiResponse<TParams>, TError, TResponse>,
      ): QueryFunction<ApiResponse<TParams>> =>
      async ({ pageParam = 0 }) => {
        const { endpoint, args } = _query(options?.args);
        const cursorKey = options?.cursorKey;
        // End format of url is e.g /users?page=2&sortOrder=ASC&limit=5&sortBy=name
        const res = await client
          .get(`${endpoint}?${cursorKey}=${pageParam}&${stringify(args, { addQueryPrefix: false })}`)
          .json<TParams>();

        return {
          data: res,
          config: null,
        };
      },
    [client],
  );

  const mutationFn = useCallback(
    <TParams = unknown, TData = unknown>(
        mutation: MutationFn<TParams, ApiResponse<TData>>,
      ): MutationFunction<ApiResponse<TData>, TParams> =>
      async (variables) => {
        const { endpoint, params, method } = mutation(variables);

        const kyConfig: Options = {
          json: params ?? undefined,
          method: method || 'POST',
        };

        const res = await client(endpoint, kyConfig).json<TData>();

        return {
          data: res,
          config: null,
        };
      },
    [client],
  );

  return {
    queryFn,
    infiniteQueryFn,
    mutationFn,
  };
};
