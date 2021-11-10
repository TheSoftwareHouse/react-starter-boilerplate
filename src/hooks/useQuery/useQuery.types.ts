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

export type Query<TParams> = {
  endpoint: string;
  name: string;
  params: TParams;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type QueryFn<TParams, TData> = (params: TParams) => Query<TParams>;
