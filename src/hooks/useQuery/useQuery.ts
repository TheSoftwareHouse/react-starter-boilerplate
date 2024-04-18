import { QueryKey, UseQueryOptions, useQuery as useRQQuery } from '@tanstack/react-query';

import { useApiClient } from '../useApiClient/useApiClient';
import { AxiosQueriesType, queries } from 'api/actions';
import { DataForQuery, ExtendedQueryMeta, GetQueryParams } from 'api/types/types';
import { parseQueryKey } from 'utils/parseQueryKey';
import { ApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

export const useQuery = <Key extends keyof AxiosQueriesType, TError = ApiError>(
  query: Key,
  args: GetQueryParams<Key>,
  options?: UseQueryOptions<DataForQuery<Key>, TError> & { meta?: Partial<ExtendedQueryMeta> },
) => {
  const { client } = useApiClient();
  const queryFn = queries[query](client);
  const queryKey: QueryKey = parseQueryKey(query, args);

  const result = useRQQuery(queryKey, async () => (await queryFn(args)) as DataForQuery<Key>, options);

  return { ...result, isLoadingAndEnabled: result.isLoading && result.fetchStatus !== 'idle' };
};
