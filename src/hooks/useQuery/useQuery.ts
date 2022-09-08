import { useMemo } from 'react';
import { QueryKey, UseQueryResult, UseQueryOptions, useQuery as useRqQuery } from '@tanstack/react-query';

import { useApiClient } from '../useApiClient/useApiClient';

export const useQuery = <TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  options?: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> => {
  const { queryFn } = useApiClient();
  const _queryFn = useMemo(() => queryFn<TData>(), [queryFn]);
  return useRqQuery<TData, TError, TData, QueryKey>(queryKey, _queryFn, options);
};
