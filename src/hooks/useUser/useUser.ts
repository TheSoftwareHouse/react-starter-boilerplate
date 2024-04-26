import { UseQueryOptions } from 'hooks/useQuery/useQuery.types';
import { GetMeQueryResponse } from 'api/actions/auth/auth.types';
import { useQuery } from '../useQuery/useQuery';
import { authQueries } from 'api/actions/auth/auth.queries';

export const useUser = (options?: UseQueryOptions<GetMeQueryResponse>) => {
  return useQuery({ ...authQueries.me(), ...options });
};
