import { AxiosError } from 'axios';
import zod from 'zod';

import { ApiError, BasicErrorData, FormErrorData } from './apiError.types';

export const getStandarizedApiError = (error: AxiosError<unknown>): ApiError => {
  const errorData = error.response?.data;
  const standarizedError = { statusCode: error.response?.status, originalError: error, data: errorData };

  if (isBasicErrorData(errorData)) {
    return {
      isBasicError: true,
      ...standarizedError,
    } as ApiError;
  }
  if (isFormErrorData(errorData)) {
    return {
      isFormError: true,
      ...standarizedError,
    } as ApiError;
  }

  return standarizedError;
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
