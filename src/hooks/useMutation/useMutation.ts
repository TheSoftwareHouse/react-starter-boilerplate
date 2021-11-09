import { UseMutationResult, useMutation as useRQMutation, UseMutationOptions, MutationFunction } from 'react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';

import { MutationFn } from '../../api/types/types';
import { useClient } from '../useClient/useClient';

function getUrl(endpoint: string) {
  return process.env.REACT_APP_API_URL + endpoint;
}

export const useMutation = <TData = unknown, TError = unknown, TParams = unknown, TContext = unknown>(
  mutation: MutationFn<TParams>,
  options: UseMutationOptions<TData, TError, TParams, TContext>,
): UseMutationResult<TData, TError, TParams, TContext> => {
  const client = useClient();

  const mutationFn: MutationFunction<TData, TParams> = useCallback(
    (variables) => {
      const { endpoint, params, method } = mutation(variables);

      const axiosConfig: AxiosRequestConfig = {
        url: getUrl(endpoint),
        data: params ? JSON.stringify(params) : undefined,
        method: method || 'POST',
      };

      return client.request(axiosConfig);
    },
    [client, mutation],
  );

  return useRQMutation<TData, TError, TParams, TContext>(mutationFn, options);
};
