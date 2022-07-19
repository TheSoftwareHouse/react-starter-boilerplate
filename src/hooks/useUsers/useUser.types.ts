import { User } from '../../api/mocks/mock-server';

export type UsersInfiniteQueryResponse = {
  users: User[];
  nextPage: number | null;
};
export type UsersInfiniteQueryArgs = {
  count: number;
};
