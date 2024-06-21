import { useQueryClient } from '@tanstack/react-query';

import { UseQueryOptions } from 'hooks/useQuery/useQuery.types';
import { GetMeQueryResponse } from 'api/actions/auth/auth.types';
import { useQuery } from '../useQuery/useQuery';
import { authQueries } from 'api/actions/auth/auth.queries';

export const useUser = (options?: UseQueryOptions<GetMeQueryResponse>) => {
  const queryClient = useQueryClient();

  const resetUser = () => queryClient.removeQueries({ queryKey: authQueries.me().queryKey });

  const query = useQuery({ ...authQueries.me(), ...options });
  return { ...query, resetUser };
};
