import { UseQueryOptions as UseRQQueryOptions, QueryFunction, QueryKey } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { ExtendedQueryMeta } from 'api/types/types';
import { StandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

export type UseQueryOptions<TQueryFnData, TError = StandardizedApiError> = Omit<
  UseRQQueryOptions<TQueryFnData, TError>,
  'queryFn'
> & {
  meta?: Partial<ExtendedQueryMeta>;
  queryFn: (client: AxiosInstance) => QueryFunction<TQueryFnData, QueryKey>;
};

export type GenericQueryOptions<TQueryFnData, TError = StandardizedApiError> = Omit<
  UseQueryOptions<TQueryFnData, TError>,
  'queryKey' | 'queryFn'
>;
