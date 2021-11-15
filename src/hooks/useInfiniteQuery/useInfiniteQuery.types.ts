import { QueryKey, UseInfiniteQueryOptions as UseRQInfiniteQueryOptions } from 'react-query';

export type InfiniteQuery<TParams> = {
  endpoint: string;
  params?: TParams;
};
/**
 * TResponse is being used in order to properly infer type in useMutation from function returning mutation parameters
 * */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type InfiniteQueryFn<TParams = unknown, TResponse = unknown> = (
  params?: UseInfiniteQueryConfigParameters<TParams>,
) => InfiniteQuery<TParams>;

export type UseInfiniteQueryConfigParameters<TParams = unknown> = {
  pageParam: number;
  pageKey: string;
  params?: TParams;
};

export type UseInfiniteQueryOptions<
  TParams = unknown,
  TError = unknown,
  TData = TParams,
  TQueryData = TParams,
  TQueryKey extends QueryKey = QueryKey,
> = UseInfiniteQueryConfigParameters<TParams> &
  Omit<UseRQInfiniteQueryOptions<TParams, TError, TData, TQueryData, TQueryKey>, 'queryKey' | 'queryFn'>;
