import { AxiosError } from 'axios';

import { APIErrorOutput, ApiErrorHandlerOptions, ErrorHandlingStrategy } from 'api/types/types';

export class ErrorResponseStrategy implements ErrorHandlingStrategy {
  getErrorObject(error: AxiosError) {
    return error.response;
  }
}

export class ErrorDataStrategy implements ErrorHandlingStrategy {
  getErrorObject(error: AxiosError) {
    return error.response?.data;
  }
}

export class ErrorDetailsStrategy implements ErrorHandlingStrategy {
  getErrorObject(error: AxiosError<{ error: unknown }>) {
    return error.response?.data?.error;
  }
}

export class ApiErrorHandler {
  private strategy: ErrorHandlingStrategy;
  private defaultErrorStatus: ApiErrorHandlerOptions['defaultErrorStatus'];

  constructor(strategy: ErrorHandlingStrategy) {
    this.strategy = strategy;
    this.defaultErrorStatus = 500;
  }

  narrowErrorData(error: AxiosError): APIErrorOutput {
    return {
      status: error.status || this.defaultErrorStatus,
      code: error.code,
      message: error.message,
    };
  }

  handleError(error: AxiosError): APIErrorOutput {
    const errorData = this.strategy.getErrorObject(error);
    return this.narrowErrorData(errorData || error);
  }
}
