import { startsWith } from 'utils/startsWith';

export const isServerError = (statusCode?: number) => {
  return startsWith(5, statusCode);
};

export const isClientError = (statusCode?: number) => {
  return startsWith(4, statusCode);
};
