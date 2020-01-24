import { ResponseInterceptor } from 'react-fetching-library';

export const fetchCurrentUserMock: ResponseInterceptor = () => async ({ endpoint, headers }, response) => {
  if (endpoint.match(/users\/me/)) {
    if (headers?.Authorization === 'Bearer MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3') {
      return {
        status: 200,
        error: false,
        payload: {
          firstName: 'Mike',
          lastName: 'Tyson',
          username: 'mike',
        },
      };
    }

    return {
      status: 403,
      error: true,
    };
  }

  return response;
};
