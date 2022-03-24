/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { QueryFunction } from 'react-query';

import { ApiClientContextValue, ApiResponse } from './ApiClientContext.types';

const mockedInitialContextValue: ApiClientContextValue = {
  queryFn:
    <TData>() =>
    () =>
      Promise.resolve({ data: {} as TData, config: null }),
  mutationFn:
    <TParams, TData>() =>
    () =>
      Promise.resolve({ data: {} as TData, config: null }),
  infiniteQueryFn:
    <TArgs, TParams, TResponse, TError>(): QueryFunction<ApiResponse<TParams>> =>
    () =>
      Promise.resolve({ data: {} as TParams, config: null }),
};

export const ApiClientContext = createContext<ApiClientContextValue>(mockedInitialContextValue);
