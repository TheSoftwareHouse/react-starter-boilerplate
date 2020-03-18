import { Server, Response as MockResponse } from 'miragejs';

import { timestampNow } from '../../context/auth/helpers';

export const mockServer = () => {
  new Server({
    routes() {
      this.namespace = process.env.REACT_APP_API_URL || 'please-set-the-env';
      this.post('/authorize', () => {
        return new MockResponse(
          200,
          {},
          JSON.stringify({
            accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
            tokenType: 'bearer',
            expires: 123,
            refreshToken: 'IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk',
          }),
        );
      });
      this.post('/refresh-token', () => {
        return new MockResponse(
          200,
          {},
          JSON.stringify({
            accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
            tokenType: 'bearer',
            expires: timestampNow() + 300,
            refreshToken: 'eKKF2QT4fwpMeJf36PO',
          }),
        );
      });
      this.get('/users/me', (schema, request) => {
        if (request.requestHeaders?.authorization === 'Bearer MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3') {
          return new MockResponse(
            200,
            {},
            JSON.stringify({
              firstName: 'Mike',
              lastName: 'Tyson',
              username: 'mike',
            }),
          );
        }

        return new MockResponse(403, {});
      });

      this.passthrough();
    },
  });
};
