import { AxiosError } from 'axios';

import { APIErrorOutput, ErrorHandlingStrategy } from 'api/types/types';

export class ErrorDefaultStrategy implements ErrorHandlingStrategy<AxiosError, AxiosError['response']> {
  getBaseErrorObject(error: AxiosError) {
    return error;
  }

  getErrorObject(error: AxiosError): AxiosError['response'] {
    return error?.response;
  }

  narrowErrorData(error: AxiosError): APIErrorOutput {
    return {
      status: error.status,
      code: error.code,
      message: error.message,
      originalError: {
        ...error,
      },
    };
  }
}

export class ApiErrorHandler<T, D> {
  private strategy: ErrorHandlingStrategy<T, D>;

  constructor(strategy: ErrorHandlingStrategy<T, D>) {
    this.strategy = strategy;
  }

  getBaseErrorObject(error: T) {
    return this.strategy.getBaseErrorObject(error);
  }

  getErrorObject(error: T) {
    return this.strategy.getErrorObject(error);
  }

  narrowData(error: T) {
    return this.strategy.narrowErrorData(error);
  }
}

const errorResponseStrategy = new ErrorDefaultStrategy();
export const responseErrorHandler = new ApiErrorHandler(errorResponseStrategy);
