import { UseMutationResult, useMutation as useRQMutation, UseMutationOptions, MutationKey } from 'react-query';

import { useApiClient } from '../useApiClient/useApiClient';

import { MutationFn } from './useMutation.types';

/**
 * Mutating data using this hook doesn't require specifying mutation function like it is required in react-query
 * @see https://react-query.tanstack.com/guides/mutations
 * This hook uses proper mutating strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */
export const useMutation = <TData = unknown, TError = unknown, TParams = unknown, TContext = unknown>(
  mutationKey: MutationKey,
  mutation: MutationFn<TParams, TData>,
  options?: UseMutationOptions<TData, TError, TParams, TContext>,
): UseMutationResult<TData, TError, TParams, TContext> => {
  const { mutationFn } = useApiClient();
  return useRQMutation<TData, TError, TParams, TContext>(mutationKey, mutationFn<TParams, TData>(mutation), options);
};
