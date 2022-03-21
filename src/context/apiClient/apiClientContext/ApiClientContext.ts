/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

import { MutationFn } from '../../../hooks/useMutation/useMutation.types';

import { ApiClientContextValue } from './ApiClientContext.types';

export const ApiClientContext = createContext<ApiClientContextValue>({
  queryFn: () => Promise.resolve(),
  mutationFn:
    <TParams, TData>(_mutation: MutationFn<TParams, TData>) =>
    (_variables) =>
      Promise.resolve({} as TData),
});
