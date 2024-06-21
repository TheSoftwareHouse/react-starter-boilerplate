/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryMeta } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export type Unwrap<T> = T extends PromiseLike<infer U> ? U : T;

export type ExtendedQueryMeta = QueryMeta & {
  error: { excludedCodes: number[]; showGlobalError: boolean };
};

export type ExtendedAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};
