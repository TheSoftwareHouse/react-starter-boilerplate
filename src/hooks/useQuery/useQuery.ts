import { QueryKey, UseQueryResult, UseQueryOptions, useQuery as useRQQuery } from '@tanstack/react-query';

import { useApiClient } from '../useApiClient/useApiClient';
import { AxiosQueriesType, queries } from 'api/actions';
import { APIErrorOutput, DataForQuery, GetQueryParams } from 'api/types/types';
import { parseQueryKey } from 'utils/parseQueryKey';

const meta = { error: { showGlobalError: true, excludedCodes: [] } };

export const useQuery = <Key extends keyof AxiosQueriesType, TError = APIErrorOutput>(
  query: Key,
  args: GetQueryParams<Key>,
  options?: UseQueryOptions<DataForQuery<Key>, TError>,
) => {
  const { client } = useApiClient();
  const queryFn = queries[query](client);
  const queryKey: QueryKey = parseQueryKey(query, args);

  const result = useRQQuery(queryKey, async () => await queryFn(args), {
    options,
    meta,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any) as UseQueryResult<DataForQuery<Key>, TError>;

  return { ...result, isLoadingAndEnabled: result.isLoading && result.fetchStatus !== 'idle' };
};
