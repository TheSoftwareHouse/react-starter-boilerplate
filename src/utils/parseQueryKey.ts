import { AxiosQueriesType } from 'api/actions';
import { GetQueryParams } from 'api/types/types';

export const parseQueryKey: <Key extends keyof AxiosQueriesType>(query: Key, args: GetQueryParams<Key>) => [string] = (
  query,
  args,
) => [Array.prototype.concat.call([], [query], Object.values(args || {})).join('_')];
/*
TODO: This joins all args into one element, there is no easy way of query key managment

 e.g. for infiniteUsersList it ganerates keys like ['getUsersList_2'] so there is no way to invalidate whole list
 */
