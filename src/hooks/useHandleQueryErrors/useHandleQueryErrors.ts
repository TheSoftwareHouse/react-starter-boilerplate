import { ClientErrorResponse, ExtendedQueryMeta } from 'api/types/types';
import { isClientError, isServerError } from 'hooks/useQuery/useQuery.utils';

export const useHandleQueryErrors = () => {
  const handleErrors = (error: ClientErrorResponse) => {
    if (isServerError(error.response?.status)) {
      // show translated error message in toast/snackbar
    }

    if (isClientError(error.response?.status)) {
      // show translated error message in toast/snackbar
    }
  };

  const shouldHandleGlobalError = (
    { showGlobalError, excludedCodes }: ExtendedQueryMeta['error'],
    errorCode?: string,
  ) => {
    if (!errorCode) {
      return false;
    }

    return !showGlobalError || excludedCodes.includes(errorCode);
  };

  return { handleErrors, shouldHandleGlobalError };
};
