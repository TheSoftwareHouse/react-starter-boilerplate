import { AxiosInstance } from 'axios';
import { stringify } from 'qs';

import { GetMeQueryResponse, GetUsersInfiniteArgs, GetUsersListArgs, GetUsersResponse } from './auth.types';

const getCurrentUser = (client: AxiosInstance) => async () => {
  return (await client.get<GetMeQueryResponse>('/me')).data;
};

const getUsersInfinite =
  (client: AxiosInstance, { count = '5' }: GetUsersInfiniteArgs) =>
  async ({ pageParam = '1' }) => {
    const queryParams = stringify({ page: pageParam, count }, { addQueryPrefix: true });
    return (await client.get<GetUsersResponse>(`/users/${queryParams}`)).data;
  };

const getUsersList =
  (client: AxiosInstance, { page = '1' }: GetUsersListArgs) =>
  async () => {
    const queryParams = stringify({ page, count: 5 }, { addQueryPrefix: true });
    return (await client.get<GetUsersResponse>(`/users/${queryParams}`)).data;
  };

const injectClient =
  <TParams, TReturn>(fn: (client: AxiosInstance, params: TParams) => TReturn, params: TParams) =>
  (client: AxiosInstance) =>
    fn(client, params);

export const authQueries = {
  all: () => ['users'],
  me: () => ({
    queryKey: [...authQueries.all(), 'me'],
    queryFn: getCurrentUser,
  }),
  lists: () => [...authQueries.all(), 'list'],
  list: (params: GetUsersListArgs) => ({
    queryKey: [...authQueries.lists(), params],
    queryFn: injectClient(getUsersList, params),
  }),
  listsInfinite: () => [...authQueries.lists(), 'infinite'],
  listInfinite: (params: GetUsersInfiniteArgs) => ({
    queryKey: [...authQueries.listsInfinite(), params],
    queryFn: injectClient(getUsersInfinite, params),
  }),
};
