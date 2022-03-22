import { useMemo } from 'react';
import { QueryKey, UseQueryResult, useQuery as useRqQuery } from 'react-query';
import { UseQueryOptions } from 'react-query/types/react/types';

import { ApiResponse } from 'context/apiClient/apiClientContext/ApiClientContext.types';
import { useApiClient } from '../useApiClient/useApiClient';

export const useQuery = <TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  options?: UseQueryOptions<ApiResponse<TData>, TError>,
): UseQueryResult<ApiResponse<TData>, TError> => {
  const { queryFn } = useApiClient();
  const _queryFn = useMemo(() => queryFn<TData>(), [queryFn]);
  return useRqQuery<ApiResponse<TData>, TError, ApiResponse<TData>, QueryKey>(queryKey, _queryFn, options);
};
