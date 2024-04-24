import { useMutation as useRQMutation, UseMutationOptions, MutationKey } from '@tanstack/react-query';

import { useApiClient } from 'hooks/useApiClient/useApiClient';
import { AxiosMutationsType, mutations } from 'api/actions';
import { ApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';
import { ExtendedQueryMeta } from 'api/types/types';

import { DataForMutation, GetMutationParams } from './useMutation.types';

/**
 * Mutating data using this hook doesn't require specifying mutation function like it is required in react-query
 * @see https://react-query.tanstack.com/guides/mutations
 * This hook uses proper mutating strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */

export const useMutation = <Key extends keyof AxiosMutationsType, TError = ApiError>(
  mutation: Key,
  options?: UseMutationOptions<DataForMutation<Key>, TError, GetMutationParams<Key>> & {
    meta?: Partial<ExtendedQueryMeta>;
  },
) => {
  const { client } = useApiClient();
  const mutationFn = mutations[mutation](client);
  const mutationKey: MutationKey = [mutation];

  return useRQMutation(mutationKey, async (args) => (await mutationFn(args)) as DataForMutation<Key>, options);
};
