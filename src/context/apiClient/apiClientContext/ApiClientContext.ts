/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { QueryFunction } from 'react-query';

import { ApiClientContextValue } from './ApiClientContext.types';

const mockedInitialContextValue: ApiClientContextValue = {
  queryFn:
    <TData>() =>
    () =>
      Promise.resolve({} as TData),
  mutationFn:
    <TParams, TData>() =>
    () =>
      Promise.resolve({} as TData),
  infiniteQueryFn:
    <TArgs, TParams, TResponse, TError>(): QueryFunction<TParams> =>
    () =>
      Promise.resolve({} as TParams),
};

export const ApiClientContext = createContext<ApiClientContextValue>(mockedInitialContextValue);
