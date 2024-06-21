import { QueryFunction, QueryKey, UseQueryOptions, useQuery as useRQQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

import { useApiClient } from '../useApiClient/useApiClient';
import { ExtendedQueryMeta } from 'api/types/types';
import { StandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

export const useQuery = <TQueryFnData = unknown, TError = StandardizedApiError>(
  params: Omit<UseQueryOptions<TQueryFnData, TError>, 'queryFn'> & {
    meta?: Partial<ExtendedQueryMeta>;
    queryFn: (client: AxiosInstance) => QueryFunction<TQueryFnData, QueryKey>;
  },
) => {
  const { client } = useApiClient();
  const { queryFn, ...options } = params;

  const result = useRQQuery({
    queryFn: (args) => queryFn(client)(args),
    ...options,
  });

  return { ...result, isLoadingAndEnabled: result.isPending && result.fetchStatus !== 'idle' };
};
