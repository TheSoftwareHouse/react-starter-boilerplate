import { UseQueryOptions as UseRQQueryOptions } from 'react-query';
import { QueryKey } from 'react-query/types/core/types';

export type UseQueryOptions<
  TParams = unknown,
  TError = unknown,
  TData = TParams,
  TQueryKey extends QueryKey = QueryKey,
> = {
  params: TParams;
} & UseRQQueryOptions<TParams, TError, TData, TQueryKey>;
