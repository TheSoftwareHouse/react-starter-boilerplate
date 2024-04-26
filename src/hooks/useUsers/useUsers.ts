import { authQueries } from 'api/actions/auth/auth.queries';
import { useInfiniteQuery } from '../useInfiniteQuery/useInfiniteQuery';

export const useUsers = () =>
  useInfiniteQuery({
    ...authQueries.listInfinite({}),
    getNextPageParam: ({ nextPage }) => {
      return nextPage ? nextPage.toString() : null;
    },
    initialPageParam: '1',
  });
