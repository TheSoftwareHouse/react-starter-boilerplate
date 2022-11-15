import { AxiosQueriesType } from 'api/actions';
import { GetQueryParams } from 'api/types/types';

export const parseQueryKey: <Key extends keyof AxiosQueriesType>(query: Key, args: GetQueryParams<Key>) => [string] = (
  query,
  args,
) => [Array.prototype.concat.call([], [query], Object.values(args || {})).join('_')];
