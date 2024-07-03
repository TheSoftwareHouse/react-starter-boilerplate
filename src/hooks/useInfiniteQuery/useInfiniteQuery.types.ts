import {
  UseInfiniteQueryOptions as UseInfiniteRQQueryOptions,
  InfiniteData,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { ExtendedQueryMeta } from 'api/types/types';
import { StandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

export type UseInfiniteQueryOptions<TQueryFnData = unknown, TError = StandardizedApiError, TPageParam = unknown> = Omit<
  UseInfiniteRQQueryOptions<TQueryFnData, TError, InfiniteData<TQueryFnData>, TQueryFnData, QueryKey, TPageParam>,
  'queryFn'
> & {
  meta?: Partial<ExtendedQueryMeta>;
  queryFn: (client: AxiosInstance) => QueryFunction<TQueryFnData, QueryKey, TPageParam>;
};

export type GenericInfiniteQueryOptions<TQueryFnData, TError = StandardizedApiError> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, TError>,
  'queryKey' | 'queryFn'
>;
