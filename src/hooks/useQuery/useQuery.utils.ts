import { startsWith } from 'utils/startsWith/startsWith';

export const isServerError = (status?: number) => {
  return startsWith(5, status);
};

export const isClientError = (status?: number) => {
  return startsWith(4, status);
};
