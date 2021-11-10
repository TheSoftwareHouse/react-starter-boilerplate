import { UseMutationResult, useMutation as useRQMutation, UseMutationOptions, MutationFunction } from 'react-query';
import { AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';

import { useClient } from '../useClient/useClient';

import { MutationFn } from './useMutation.types';

export const useMutation = <TData = unknown, TError = unknown, TParams = unknown, TContext = unknown>(
  mutation: MutationFn<TParams, TData>,
  options: UseMutationOptions<TData, TError, TParams, TContext>,
): UseMutationResult<TData, TError, TParams, TContext> => {
  const client = useClient();

  const mutationFn: MutationFunction<TData, TParams> = useCallback(
    (variables) => {
      const { endpoint, params, method } = mutation(variables);

      const axiosConfig: AxiosRequestConfig = {
        url: endpoint,
        data: params ? JSON.stringify(params) : undefined,
        method: method || 'POST',
      };

      return client.request(axiosConfig);
    },
    [client, mutation],
  );

  return useRQMutation<TData, TError, TParams, TContext>(mutationFn, options);
};
