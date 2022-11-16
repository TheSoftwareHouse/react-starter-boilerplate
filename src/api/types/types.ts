/* eslint-disable @typescript-eslint/no-explicit-any */

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

import { AxiosQueriesType } from 'api/actions';

export type Unwrap<T> = T extends PromiseLike<infer U> ? U : T;

export type GetQueryParams<Key extends keyof AxiosQueriesType> = ReturnType<AxiosQueriesType[Key]> extends (
  value: infer Params,
) => any
  ? Params extends Parameters<ReturnType<AxiosQueriesType[keyof AxiosQueriesType]>>[0]
    ? Params
    : any
  : never;

export type DataForQuery<TQueryKey extends keyof AxiosQueriesType> = Unwrap<
  ReturnType<ReturnType<AxiosQueriesType[TQueryKey]>>
>;

export type ArgsForQuery<TQueryKey extends keyof AxiosQueriesType> = GetQueryParams<TQueryKey>;
