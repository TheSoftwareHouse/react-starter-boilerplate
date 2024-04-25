import { UseQueryOptions } from '@tanstack/react-query';

import { GetMeQueryResponse } from 'api/actions/auth/auth.types';
import { useQuery } from '../useQuery/useQuery';

export const useUser = (options?: Omit<UseQueryOptions<GetMeQueryResponse>, 'queryFn' | 'queryKey'>) => {
  return useQuery('getCurrentUser', {}, options);
};
