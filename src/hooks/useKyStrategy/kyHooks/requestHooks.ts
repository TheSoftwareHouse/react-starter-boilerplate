import { authStorage } from '../../../context/auth/authStorage/AuthStorage';

export const requestSuccessHook = (request: Request) => {
  if (authStorage.accessToken) {
    request.headers.set('Authorization', `Bearer ${authStorage.accessToken}`);
  }
};
