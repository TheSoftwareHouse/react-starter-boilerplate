import { isClientError, isServerError } from 'utils/apiErrorStatuses';
import { ApiError } from 'context/apiClient/apiClientContextController/apiError/apiError.types';
import { ExtendedQueryMeta } from 'api/types/types';

export const useHandleQueryErrors = () => {
  const handleErrors = (error: ApiError) => {
    if (isServerError(error.statusCode)) {
      // show translated error message in toast/snackbar
      // handle logger
    }

    if (isClientError(error.statusCode)) {
      // show translated error message in toast/snackbar
      // handle logger
    }
  };

  const shouldHandleGlobalError = (metaError?: ExtendedQueryMeta['error'], errorCode?: number) => {
    if (!errorCode || !metaError) {
      return false;
    }

    return !metaError.showGlobalError || metaError.excludedCodes.includes(errorCode);
  };

  return { handleErrors, shouldHandleGlobalError };
};
