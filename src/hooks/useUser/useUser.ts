import { UseQueryOptions } from '@tanstack/react-query';

import { meQueryKey } from '../../api/actions/auth/authActions';
import { GetMeQueryResponse } from '../../api/actions/auth/authActions.types';
import { useQuery } from '../useQuery/useQuery';

export const useUser = (options?: UseQueryOptions<GetMeQueryResponse>) =>
  useQuery<GetMeQueryResponse>(meQueryKey, options);
