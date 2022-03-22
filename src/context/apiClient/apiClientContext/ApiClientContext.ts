/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { QueryFunction } from 'react-query';

import { MutationFn } from 'hooks/useMutation/useMutation.types';
import { InfiniteQueryFn, UseInfiniteQueryOptions } from 'hooks/useInfiniteQuery/useInfiniteQuery.types';

import { ApiClientContextValue, ApiResponse } from './ApiClientContext.types';

const mockedInitialContextValue: ApiClientContextValue = {
  queryFn: () => Promise.resolve({ data: {}, config: null }),
  mutationFn:
    <TParams, TData>(_mutation: MutationFn<TParams, ApiResponse<TData>>) =>
    (_variables) =>
      Promise.resolve({ data: {} as TData, config: null }),
  infiniteQueryFn:
    <TArgs, TParams, TResponse, TError>(
      _query: InfiniteQueryFn<TArgs, ApiResponse<TParams>, TResponse>,
      _options?: UseInfiniteQueryOptions<TArgs, ApiResponse<TParams>, TError, TResponse>,
    ): QueryFunction<ApiResponse<TParams>> =>
    (_ctx) =>
      Promise.resolve({ data: {} as TParams, config: null }),
};

export const ApiClientContext = createContext<ApiClientContextValue>(mockedInitialContextValue);
