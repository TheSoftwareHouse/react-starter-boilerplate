import { ClientErrorResponse, ExtendedQueryMeta } from 'api/types/types';
import { isClientError, isServerError } from 'hooks/useQuery/useQuery.utils';

export const useHandleQueryErrors = () => {
  const handleErrors = (error: ClientErrorResponse) => {
    if (isServerError(error.status)) {
      // show translated error message in toast/snackbar
      // handle logger method from useLogger hook
    }

    if (isClientError(error.status)) {
      // show translated error message in toast/snackbar
      // handle logger method from useLogger hook
    }
  };

  const shouldHandleGlobalError = (metaError?: ExtendedQueryMeta['error'], errorCode?: string) => {
    if (!errorCode || !metaError) {
      return false;
    }

    return !metaError.showGlobalError || metaError.excludedCodes.includes(errorCode);
  };

  return { handleErrors, shouldHandleGlobalError };
};
