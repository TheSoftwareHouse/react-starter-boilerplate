import { InfiniteData, QueryFunction, QueryKey, UseInfiniteQueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { StandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';
import { ExtendedQueryMeta } from 'api/types/types';

export const queryFactoryOptions = <TQueryFnData = unknown, TError = StandardizedApiError>(
  options: Omit<UseQueryOptions<TQueryFnData, TError>, 'queryFn'> & {
    meta?: Partial<ExtendedQueryMeta>;
    queryFn: (client: AxiosInstance) => QueryFunction<TQueryFnData, QueryKey>;
  },
) => options;

export const infiniteQueryFactoryOptions = <
  TPageParam = unknown,
  TQueryFnData = unknown,
  TError = StandardizedApiError,
>(
  options: Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, InfiniteData<TQueryFnData>, TQueryFnData, QueryKey, TPageParam>,
    'queryFn'
  > & {
    meta?: Partial<ExtendedQueryMeta>;
    queryFn: (client: AxiosInstance) => QueryFunction<TQueryFnData, QueryKey, TPageParam>;
  },
) => options;
