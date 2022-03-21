/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { QueryFunction } from 'react-query';

import { MutationFn } from '../../../hooks/useMutation/useMutation.types';
import { InfiniteQueryFn, UseInfiniteQueryOptions } from '../../../hooks/useInfiniteQuery/useInfiniteQuery.types';

import { ApiClientContextValue } from './ApiClientContext.types';

const mockedInitialContextValue: ApiClientContextValue = {
  queryFn: () => Promise.resolve(),
  mutationFn:
    <TParams, TData>(_mutation: MutationFn<TParams, TData>) =>
    (_variables) =>
      Promise.resolve({} as TData),
  infiniteQueryFn:
    <TArgs, TParams, TResponse, TError>(
      _query: InfiniteQueryFn<TArgs, TParams, TResponse>,
      _options?: UseInfiniteQueryOptions<TArgs, TParams, TError, TResponse>,
    ): QueryFunction<TParams> =>
    (_ctx) =>
      Promise.resolve({} as TParams),
};

export const ApiClientContext = createContext<ApiClientContextValue>(mockedInitialContextValue);
