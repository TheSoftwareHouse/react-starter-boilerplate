import { AxiosError } from 'axios';
import zod from 'zod';

import { formErrorDataSchema, basicErrorDataSchema } from './apiError';

export type ApiError = {
  statusCode: number | undefined;
} & (
  | {
      isFormError?: never;
      isBasicError?: never;
      data: unknown;
      originalError: AxiosError;
    }
  | {
      isFormError?: never;
      isBasicError: true;
      data: BasicErrorData;
      originalError: AxiosError<BasicErrorData>;
    }
  | {
      isBasicError?: never;
      isFormError: true;
      data: FormErrorData;
      originalError: AxiosError<FormErrorData>;
    }
);

export type FormErrorData = zod.infer<typeof formErrorDataSchema>;

export type BasicErrorData = zod.infer<typeof basicErrorDataSchema>;
