import { AxiosError } from 'axios';

import { APIErrorOutput, ApiErrorHandlerOptions, ErrorHandlingStrategy } from 'api/types/types';

export class ErrorDefaultStrategy implements ErrorHandlingStrategy<AxiosError> {
  getErrorObject(error: AxiosError) {
    return error;
  }
}

export class ErrorResponseStrategy implements ErrorHandlingStrategy<AxiosError['response']> {
  getErrorObject(error: AxiosError) {
    return error.response;
  }
}

export class ApiErrorHandler {
  private strategy: ErrorDefaultStrategy;
  private defaultErrorStatus: ApiErrorHandlerOptions['defaultErrorStatus'];

  constructor(strategy: ErrorHandlingStrategy<AxiosError>) {
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

const errorResponseStrategy = new ErrorDefaultStrategy();
export const responseErrorHandler = new ApiErrorHandler(errorResponseStrategy);
