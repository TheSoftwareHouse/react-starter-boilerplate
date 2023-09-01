import { AxiosInstance } from 'axios';
import { stringify } from 'qs';

import {
  GetMeQueryResponse,
  GetUsersInfiniteArgs,
  GetUsersListArgs,
  GetUsersResponse,
  // QUERY_TYPE_IMPORTS
} from './auth.types';

export const authQueries = {
  getCurrentUser: (client: AxiosInstance) => async () => {
    return (await client.get<GetMeQueryResponse>('/me')).data;
  },
  getUsersInfinite:
    (client: AxiosInstance) =>
    async ({ pageParam = '0', count = '5' }: GetUsersInfiniteArgs) => {
      const queryParams = stringify({ page: pageParam, count: count }, { addQueryPrefix: true });
      return (await client.get<GetUsersResponse>(`/users/${queryParams}`)).data;
    },
  getUsersList:
    (client: AxiosInstance) =>
    async ({ page = '0' }: GetUsersListArgs) => {
      const queryParams = stringify({ page, count: 5 }, { addQueryPrefix: true });
      return (await client.get<GetUsersResponse>(`/users/${queryParams}`)).data;
    },
  // QUERY_FUNCTIONS_SETUP
};
