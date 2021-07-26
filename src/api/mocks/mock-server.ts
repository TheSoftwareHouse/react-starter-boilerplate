import { Server, Response as MockResponse } from 'miragejs';

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
      this.get('/users', () => {
        return new MockResponse(
          200,
          {},
          JSON.stringify({
            firstName: 'Mike',
            lastName: 'Tyson',
            username: 'mike',
          }),
        );
      });

      this.passthrough(`${process.env.REACT_APP_API_URL}/**`);
    },
  });
};
