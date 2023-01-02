import { useInfiniteQuery } from '../useInfiniteQuery/useInfiniteQuery';

import { Filters, SortType } from './useUsers.types';

const sortFn = (a: string, b: string, sort?: SortType) => {
  return sort === 'DESC' ? b.localeCompare(a) : a.localeCompare(b);
};

export const useUsers = (filters?: Filters) =>
  useInfiniteQuery(
    'getUsersInfinite',
    {},
    {
      getNextPageParam: ({ nextPage }) => {
        return nextPage;
      },
      select: (data) => {
        return {
          ...data,
          pages: data.pages.map((page) => {
            return {
              ...page,
              users: page.users.sort((a, b) => sortFn(a.name, b.name, filters?.sort)),
            };
          }),
        };
      },
    },
  );
