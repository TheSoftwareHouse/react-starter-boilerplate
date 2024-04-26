import { UseQueryOptions as UseRQQueryOptions } from '@tanstack/react-query';

import { StandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

export type UseQueryOptions<TData> = Omit<UseRQQueryOptions<TData, StandardizedApiError>, 'queryFn' | 'queryKey'>;
