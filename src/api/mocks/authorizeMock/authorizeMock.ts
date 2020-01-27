import { ResponseInterceptor } from 'react-fetching-library';

export const authorizeMock: ResponseInterceptor = () => async ({ endpoint }, response) => {
  if (endpoint.match(/authorize/)) {
    return {
      status: 200,
      error: false,
      payload: {
        accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
        tokenType: 'bearer',
        expires: '2592000',
        refreshToken: 'IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk',
      },
    };
  }

  return response;
};
