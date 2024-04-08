import { AxiosError } from 'axios';

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

export type FormErrorData = Zod.infer<typeof formErrorDataSchema>;

export type BasicErrorData = Zod.infer<typeof basicErrorDataSchema>;
