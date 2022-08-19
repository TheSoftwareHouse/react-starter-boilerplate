export type User = {
  id: string;
  name: string;
};

export type UsersInfiniteQueryResponse = {
  users: User[];
  nextPage: number | null;
};
export type UsersInfiniteQueryArgs = {
  count: number;
};
