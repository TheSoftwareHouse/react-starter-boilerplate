import { isClientError, isServerError } from 'utils/apiErrorStatuses';
import { ExtendedQueryMeta } from 'api/types/types';
import { logger } from 'integrations/logger';
import { StandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';

export const useHandleQueryErrors = () => {
  const handleErrors = (error: StandardizedApiError) => {
    if (isServerError(error.statusCode)) {
      logger.error(error.originalError.message);
      return;
    }

    if (isClientError(error.statusCode)) {
      logger.error(error.originalError.message);
      return;
    }

    // Handle network errors without an HTTP status code.
    logger.error(error.originalError);
  };

  const shouldHandleGlobalError = (metaError?: ExtendedQueryMeta['error'], errorCode?: number) => {
    if (!metaError?.showGlobalError || errorCode === undefined) {
      return false;
    }

    return !metaError.excludedCodes.includes(errorCode);
  };
  return { handleErrors, shouldHandleGlobalError };
};
