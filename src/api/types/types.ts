/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryMeta } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { AxiosQueriesType } from 'api/actions';

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

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

export type ExtendedQueryMeta = QueryMeta & {
  error: { excludedCodes: number[]; showGlobalError: boolean };
};

export type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};
