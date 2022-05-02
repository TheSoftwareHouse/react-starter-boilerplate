import { useCallback, useMemo } from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import { MutationFunction, QueryFunction } from 'react-query';
import { stringify } from 'qs';

import { ApiClientContextValue } from 'context/apiClient/apiClientContext/ApiClientContext.types';
import { MutationFn } from 'hooks/useMutation/useMutation.types';
import { InfiniteQueryFn, UseInfiniteQueryOptions } from 'hooks/useInfiniteQuery/useInfiniteQuery.types';

import { responseFailureInterceptor, responseSuccessInterceptor } from './interceptors/responseInterceptors';
import { requestSuccessInterceptor } from './interceptors/requestInterceptors';

export const useAxiosStrategy = (): ApiClientContextValue => {
  const client = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });

    axios.interceptors.request.use(requestSuccessInterceptor);
    axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);

    return axios;
  }, []);

  const queryFn = useCallback(
    <TData>(): QueryFunction<TData> =>
      async ({ queryKey: [url] }) => {
        if (typeof url === 'string') {
          const lowerCaseUrl = url.toLowerCase();
          const { data } = await client.get(`/${lowerCaseUrl}`);
          return data;
        }
        throw new Error('Invalid QueryKey');
      },
    [client],
  );

  const infiniteQueryFn = useCallback(
    <TArgs, TParams, TResponse, TError>(
        query: InfiniteQueryFn<TArgs, TParams, TResponse>,
        options?: UseInfiniteQueryOptions<TArgs, TParams, TError, TResponse>,
      ): QueryFunction<TParams> =>
      async ({ pageParam = 0 }) => {
        const { endpoint, args } = query(options?.args);
        const cursorKey = options?.cursorKey;
        // End format of url is e.g /users?page=2&sortOrder=ASC&limit=5&sortBy=name
        const { data } = await client.get(
          `/${endpoint}?${cursorKey}=${pageParam}&${stringify(args, { addQueryPrefix: false })}`,
        );
        return data;
      },
    [client],
  );

  const mutationFn = useCallback(
    <TParams = unknown, TData = unknown>(mutation: MutationFn<TParams, TData>): MutationFunction<TData, TParams> =>
      async (variables) => {
        const { endpoint, params, method } = mutation(variables);

        const axiosConfig: AxiosRequestConfig = {
          url: `/${endpoint}`,
          data: params ? JSON.stringify(params) : undefined,
          method: method || 'POST',
        };
        const { data } = await client.request(axiosConfig);
        return data;
      },
    [client],
  );

  return {
    queryFn,
    infiniteQueryFn,
    mutationFn,
  };
};
