import { useMemo } from 'react';
import { QueryKey, UseQueryResult, UseQueryOptions, useQuery as useRQQuery } from '@tanstack/react-query';

import { useApiClient } from '../useApiClient/useApiClient';

export const useQuery = <TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  options?: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> & { isLoadingAndEnabled: boolean } => {
  const { queryFn } = useApiClient();
  const _queryFn = useMemo(() => queryFn<TData>(), [queryFn]);
  const result = useRQQuery<TData, TError, TData, QueryKey>(queryKey, _queryFn, options);

  return { ...result, isLoadingAndEnabled: result.isLoading && result.fetchStatus !== 'idle' };
};
