import { useInfiniteQuery } from '../useInfiniteQuery/useInfiniteQuery';

export const useUsers = () =>
  useInfiniteQuery(
    'getUsersInfinite',
    {},
    {
      getNextPageParam: ({ nextPage }) => {
        return nextPage;
      },
    },
  );
