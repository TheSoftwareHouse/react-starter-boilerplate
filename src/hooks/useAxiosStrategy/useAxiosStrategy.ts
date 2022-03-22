import { useCallback, useMemo } from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import { MutationFunction, QueryFunction } from 'react-query';
import { stringify } from 'qs';

import { ApiClientContextValue, ApiResponse } from 'context/apiClient/apiClientContext/ApiClientContext.types';
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

  const queryFn: QueryFunction<ApiResponse> = useCallback(
    async ({ queryKey: [url] }) => {
      if (typeof url === 'string') {
        const lowerCaseUrl = url.toLowerCase();
        const response = await client.get(`/${lowerCaseUrl}`);
        const { data, ...config } = response;
        return {
          data,
          config,
        };
      }
      throw new Error('Invalid QueryKey');
    },
    [client],
  );

  const infiniteQueryFn = useCallback(
    <TArgs, TParams, TResponse, TError>(
        query: InfiniteQueryFn<TArgs, ApiResponse<TParams>, TResponse>,
        options?: UseInfiniteQueryOptions<TArgs, ApiResponse<TParams>, TError, TResponse>,
      ): QueryFunction<ApiResponse<TParams>> =>
      async ({ pageParam = 0 }) => {
        const { endpoint, args } = query(options?.args);
        const cursorKey = options?.cursorKey;
        // End format of url is e.g /users?page=2&sortOrder=ASC&limit=5&sortBy=name
        const response = await client.get(
          `/${endpoint}?${cursorKey}=${pageParam}&${stringify(args, { addQueryPrefix: false })}`,
        );
        const { data, ...config } = response;
        return {
          data,
          config,
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

        const axiosConfig: AxiosRequestConfig = {
          url: `/${endpoint}`,
          data: params ? JSON.stringify(params) : undefined,
          method: method || 'POST',
        };
        const response = await client.request(axiosConfig);
        const { data, ...config } = response;

        return {
          data,
          config,
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
