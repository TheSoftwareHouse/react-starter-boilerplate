/* eslint-disable @typescript-eslint/no-explicit-any */

import { AxiosMutationsType } from 'api/actions';
import { Unwrap } from 'api/types/types';

export type DataForMutation<TMutationKey extends keyof AxiosMutationsType> = Unwrap<
  ReturnType<ReturnType<AxiosMutationsType[TMutationKey]>>
>;

export type GetMutationParams<Key extends keyof AxiosMutationsType> = ReturnType<AxiosMutationsType[Key]> extends (
  value: infer Params,
) => any
  ? Params extends Parameters<ReturnType<AxiosMutationsType[keyof AxiosMutationsType]>>[0]
    ? Params
    : any
  : never;
