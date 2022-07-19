import { UseQueryOptions } from 'react-query/types/react/types';

import { useQuery } from '../useQuery/useQuery';
import { GetMeQueryResponse } from '../../api/actions/auth/authActions.types';
import { meQueryKey } from '../../api/actions/auth/authActions';

export const useUser = (options?: UseQueryOptions<GetMeQueryResponse>) =>
  useQuery<GetMeQueryResponse>(meQueryKey, options);
