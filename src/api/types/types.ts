/* eslint-disable @typescript-eslint/no-explicit-any */

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

import { AxiosError, AxiosRequestConfig } from 'axios';
import { QueryMeta } from '@tanstack/react-query';

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

export type APIErrorOutput = Pick<AxiosError, 'code' | 'message' | 'status'>;

export type ClientErrorResponse<TErrorData = APIErrorOutput> = AxiosError<TErrorData, unknown>;

export type ExtendedQueryMeta = QueryMeta & {
  error: { excludedCodes: string[]; showGlobalError: boolean };
};

export type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

export interface ErrorHandlingStrategy<T> {
  getErrorObject(error: AxiosError): T;
}

export interface ApiErrorHandlerOptions {
  defaultErrorStatus: number;
}
