import {
  UseMutationResult,
  useMutation as useRQMutation,
  UseMutationOptions,
  MutationKey,
} from '@tanstack/react-query';

import { useApiClient } from 'hooks/useApiClient/useApiClient';
import { AxiosMutationsType, mutations } from 'api/actions';
import { APIErrorOutput } from 'api/types/types';

import { DataForMutation, GetMutationParams } from './useMutation.types';

const metaConfig = { error: { showGlobalError: true, excludedCodes: [] } };

/**
 * Mutating data using this hook doesn't require specifying mutation function like it is required in react-query
 * @see https://react-query.tanstack.com/guides/mutations
 * This hook uses proper mutating strategy provided via ApiClientContext
 * @see ApiClientContextController.ts
 * */

export const useMutation = <Key extends keyof AxiosMutationsType, TError = APIErrorOutput>(
  mutation: Key,
  options?: UseMutationOptions<DataForMutation<Key>, TError>,
) => {
  const { client } = useApiClient();
  const mutationFn = mutations[mutation](client);
  const mutationKey: MutationKey = [mutation];

  return useRQMutation(
    mutationKey,
    async (args) => await mutationFn(args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (options = { meta: metaConfig, ...options } as any),
  ) as UseMutationResult<DataForMutation<Key>, TError, GetMutationParams<Key>>;
};
