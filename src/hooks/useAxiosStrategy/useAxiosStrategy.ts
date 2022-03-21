import { useCallback, useMemo } from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import { MutationFunction, QueryFunction } from 'react-query';
import { stringify } from 'qs';

import { ApiClientContextValue } from '../../context/apiClient/apiClientContext/ApiClientContext.types';
import { MutationFn } from '../useMutation/useMutation.types';
import { InfiniteQueryFn, UseInfiniteQueryOptions } from '../useInfiniteQuery/useInfiniteQuery.types';
import { ClientResponse } from '../../api/types/types';

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

  const queryFn: QueryFunction<ClientResponse> = useCallback(
    ({ queryKey: [url] }) => {
      if (typeof url === 'string') {
        const lowerCaseUrl = url.toLowerCase();
        return client.get<ClientResponse>(lowerCaseUrl);
      }
      throw new Error('Invalid QueryKey');
    },
    [client],
  );

  const infiniteQueryFn = useCallback(
    <TArgs, TParams, TResponse, TError>(
        _query: InfiniteQueryFn<TArgs, TParams, TResponse>,
        options?: UseInfiniteQueryOptions<TArgs, TParams, TError, TResponse>,
      ): QueryFunction<TParams> =>
      ({ pageParam = 0 }) => {
        const { endpoint, args } = _query(options?.args);
        const cursorKey = options?.cursorKey;
        // End format of url is e.g /users?page=2&sortOrder=ASC&limit=5&sortBy=name
        return client.get(`${endpoint}?${cursorKey}=${pageParam}&${stringify(args, { addQueryPrefix: false })}`);
      },
    [client],
  );

  const mutationFn = useCallback(
    <TParams = unknown, TData = unknown>(mutation: MutationFn<TParams, TData>): MutationFunction<TData, TParams> =>
      (variables) => {
        const { endpoint, params, method } = mutation(variables);

        const axiosConfig: AxiosRequestConfig = {
          url: endpoint,
          data: params ? JSON.stringify(params) : undefined,
          method: method || 'POST',
        };

        return client.request(axiosConfig);
      },
    [client],
  );

  return {
    queryFn,
    infiniteQueryFn,
    mutationFn,
  };
};
