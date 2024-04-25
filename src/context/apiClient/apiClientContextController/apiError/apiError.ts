import { AxiosError } from 'axios';
import zod from 'zod';

import { BasicApiError, BasicErrorData, FormApiError, FormErrorData, UnknownApiError } from './apiError.types';

export class ApiError<T extends BasicApiError | FormApiError | UnknownApiError> extends Error {
  originalError: T['originalError'];
  statusCode: T['statusCode'];
  type: T['type'];
  data: T['data'];

  constructor(data: T, message?: string) {
    super(message);
    this.name = 'ApiError';
    this.originalError = data.originalError;
    this.type = data.type;
    this.statusCode = data.statusCode;
    this.data = data.data;
  }
}

export const getStandardizedApiError = (
  error: AxiosError<unknown>,
): ApiError<BasicApiError> | ApiError<FormApiError> | ApiError<UnknownApiError> => {
  const errorData = error.response?.data;
  const standarizedError = {
    type: 'unknown',
    statusCode: error.response?.status,
    originalError: error,
    data: errorData,
  } satisfies UnknownApiError;

  if (isBasicErrorData(errorData)) {
    return new ApiError({
      ...standarizedError,
      type: 'basic',
    } as BasicApiError);
  }
  if (isFormErrorData(errorData)) {
    return new ApiError({
      ...standarizedError,
      type: 'form',
    } as FormApiError);
  }

  return new ApiError(standarizedError);
};

export const basicErrorDataSchema = zod.object({
  error: zod.object({
    code: zod.string(),
    message: zod.string().optional(),
  }),
});

const isBasicErrorData = (error: unknown): error is BasicErrorData => {
  const { success } = basicErrorDataSchema.safeParse(error);
  return success;
};

export const formErrorDataSchema = zod.object({
  errors: zod.record(zod.string(), zod.array(zod.string())),
});

const isFormErrorData = (error: unknown): error is FormErrorData => {
  const { success } = formErrorDataSchema.safeParse(error);
  return success;
};
