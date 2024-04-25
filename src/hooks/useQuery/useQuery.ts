import { QueryKey, UseQueryOptions, useQuery as useRQQuery } from '@tanstack/react-query';

import { useApiClient } from '../useApiClient/useApiClient';
import { AxiosQueriesType, queries } from 'api/actions';
import { DataForQuery, ExtendedQueryMeta, GetQueryParams } from 'api/types/types';
import { parseQueryKey } from 'utils/parseQueryKey';
import { StandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

export const useQuery = <Key extends keyof AxiosQueriesType, TError = StandardizedApiError>(
  query: Key,
  args: GetQueryParams<Key>,
  options?: Omit<UseQueryOptions<DataForQuery<Key>, TError>, 'queryFn' | 'queryKey'> & {
    meta?: Partial<ExtendedQueryMeta>;
  },
) => {
  const { client } = useApiClient();
  const queryFn = queries[query](client);
  const queryKey: QueryKey = parseQueryKey(query, args);

  const result = useRQQuery({
    queryKey,
    queryFn: async () => (await queryFn(args)) as DataForQuery<Key>,
    ...options,
  });

  return { ...result, isLoadingAndEnabled: result.isLoading && result.fetchStatus !== 'idle' };
};
