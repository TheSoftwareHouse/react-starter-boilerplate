import { UseQueryOptions as UseRQQueryOptions } from 'react-query';
import { QueryKey } from 'react-query/types/core/types';

export type UseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = {
  variables: TQueryFnData;
} & UseRQQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
