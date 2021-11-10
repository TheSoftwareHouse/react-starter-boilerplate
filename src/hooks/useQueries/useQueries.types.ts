import { QueryKey } from 'react-query/types/core/types';
import { QueryFunction, UseQueryOptions as UseRQQueryOptions } from 'react-query';

import { QueryFn, UseQueryOptions } from '../useQuery/useQuery.types';

export type UseQueriesOptions<TParams = unknown, TError = unknown, TData = unknown> = {
  queryKey: QueryKey;
  query: QueryFn<TParams, TData>;
  options?: UseQueryOptions<TParams, TError, TData>;
};

export type UseQueriesMappedOption<TParams = unknown, TError = unknown, TData = unknown> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<TParams>;
  options: UseRQQueryOptions<TParams, TError, TData>;
};
