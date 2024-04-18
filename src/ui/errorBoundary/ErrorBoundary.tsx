import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ErrorInfo } from 'react';

import { logger } from 'integrations/logger';

import { ErrorBoundaryProps } from './ErrorBoundary.types';

export const ErrorBoundary = ({ shouldLog = true, onError, ...props }: ErrorBoundaryProps) => {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    if (shouldLog) {
      logger.error(error);
    }
    onError?.(error, errorInfo);
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ReactErrorBoundary onError={handleError} {...props} />;
};
