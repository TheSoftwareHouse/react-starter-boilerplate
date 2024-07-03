import { AxiosError } from 'axios';
import zod from 'zod';

import { ApiError } from './apiError';
import { formErrorDataSchema, basicErrorDataSchema } from './apiError';

export type FormErrorData = zod.infer<typeof formErrorDataSchema>;

export type BasicErrorData = zod.infer<typeof basicErrorDataSchema>;

type BaseApiError<TData = unknown> = {
  statusCode: number | undefined;
  data: TData;
  originalError: AxiosError<TData>;
};

export type BasicApiError = { type: 'basic' } & BaseApiError<BasicErrorData>;

export type FormApiError = { type: 'form' } & BaseApiError<FormErrorData>;

export type UnknownApiError = { type: 'unknown' } & BaseApiError;

export type StandardizedApiError = ApiError<BasicApiError> | ApiError<FormApiError> | ApiError<UnknownApiError>;
