import { useInfiniteQuery } from '../useInfiniteQuery/useInfiniteQuery';
import { getInfiniteUsersQuery, usersQueryKey } from '../../api/actions/auth/authActions';
import { UseInfiniteQueryOptions } from '../useInfiniteQuery/useInfiniteQuery.types';

import { UsersInfiniteQueryArgs, UsersInfiniteQueryResponse } from './useUser.types';

export const useUsers = (options?: UseInfiniteQueryOptions<UsersInfiniteQueryArgs, UsersInfiniteQueryResponse>) =>
  useInfiniteQuery<UsersInfiniteQueryArgs, UsersInfiniteQueryResponse>(usersQueryKey, getInfiniteUsersQuery, {
    ...options,
    cursorKey: 'page',
    args: {
      count: 5,
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
  });
