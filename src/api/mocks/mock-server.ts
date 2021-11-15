import { Server, Response as MockResponse, Model, Factory } from 'miragejs';
import { AnyFactories, ModelDefinition, Registry } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

type User = {
  name: string;
};

const UserModel: ModelDefinition<User> = Model.extend({ name: 'user' });

type AppRegistry = Registry<{ user: typeof UserModel }, AnyFactories>;

export const mockServer = () => {
  new Server({
    logging: true,
    models: {
      user: Model,
    },
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
      }),
    },
    seeds(server: Server<AppRegistry>) {
      server.createList('user', 40);
    },
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
      this.get('/me', () => {
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
      this.get('/users', (schema: Schema<AppRegistry>, request) => {
        const qp = request.queryParams;
        const page = qp.page ? parseInt(qp.page) : null;

        if (!page) {
          const allUsers = schema.all('user');
          return new MockResponse(200, {}, JSON.stringify(allUsers.models));
        }
        const start = page;
        const end = start + 1;

        const filtered = schema.all('user').models.slice(start, end);
        return new MockResponse(200, {}, JSON.stringify(filtered));
      });

      this.passthrough(`${process.env.REACT_APP_API_URL}/**`);
    },
  });
};
