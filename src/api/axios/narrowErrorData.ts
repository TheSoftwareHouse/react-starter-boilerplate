import { AxiosError } from 'axios';

import { APIErrorOutput } from 'api/types/types';

export const narrowErrorData = (error: AxiosError): APIErrorOutput => {
  return {
    status: error.status,
    code: error.code,
    message: error.message,
    originalError: {
      ...error,
    },
  };
};
