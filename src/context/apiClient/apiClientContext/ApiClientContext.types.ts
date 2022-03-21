import { MutationFunction, QueryFunction } from 'react-query';

import { MutationFn } from '../../../hooks/useMutation/useMutation.types';

export type ApiClientContextValue = {
  queryFn: QueryFunction;
  mutationFn: <TParams, TData>(mutation: MutationFn<TParams, TData>) => MutationFunction<TData, TParams>;
};
