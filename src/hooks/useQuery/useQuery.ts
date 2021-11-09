import { stringify } from 'qs';
import { QueryFunction, QueryKey, useQuery as useRQQuery, UseQueryResult } from 'react-query';
import axios from 'axios';

import { ActionFn } from '../../api/types/types';

import { UseQueryOptions } from './useQuery.types';

function getUrl<TVariables>(path: string, params?: TVariables) {
  let url = process.env.REACT_APP_API_URL + path;

  if (params && Object.keys(params).length > 0) {
    url = url + '?' + stringify(params);
  }

  return url;
}

export const useQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(
  action: ActionFn<TQueryFnData>,
  options: UseQueryOptions<TQueryFnData, TError, TData>,
): UseQueryResult<TData, TError> => {
  const { variables, ...reactQueryOptions } = options;

  const { name, endpoint, params } = action(variables);

  const queryKey: QueryKey = [name, endpoint, params];

  const queryFn: QueryFunction<TQueryFnData> = async () => {
    return axios.get(getUrl(endpoint, params));
  };

  return useRQQuery<TQueryFnData, TError, TData, QueryKey>(queryKey, queryFn, {
    ...reactQueryOptions,
  });
};
