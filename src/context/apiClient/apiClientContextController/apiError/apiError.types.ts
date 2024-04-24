import { AxiosError } from 'axios';
import zod from 'zod';

import { formErrorDataSchema, basicErrorDataSchema } from './apiError';

export type FormErrorData = zod.infer<typeof formErrorDataSchema>;

export type BasicErrorData = zod.infer<typeof basicErrorDataSchema>;

type BaseApiError<TData = unknown> = {
  statusCode: number | undefined;
  data: TData;
  originalError: AxiosError<TData>;
};

type BasicApiError = { type: 'basic' } & BaseApiError<BasicErrorData>;

type FormApiError = { type: 'form' } & BaseApiError<FormErrorData>;

type UnknownApiError = { type: 'unknown' } & BaseApiError;

export type ApiError = BasicApiError | FormApiError | UnknownApiError;
