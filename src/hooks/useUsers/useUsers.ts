import { useInfiniteQuery } from '../useInfiniteQuery/useInfiniteQuery';

export const useUsers = () =>
  useInfiniteQuery({
    query: 'getUsersInfinite',
    options: {
      getNextPageParam: ({ nextPage }) => {
        return nextPage ? nextPage.toString() : null;
      },
      initialPageParam: '1',
    },
  });
