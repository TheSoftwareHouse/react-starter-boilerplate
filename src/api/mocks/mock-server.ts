import { Server, Response as MockResponse, Model, Factory } from 'miragejs';
import { AnyFactories, ModelDefinition, Registry } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

type User = {
  id: number;
  name: string;
};

const UserModel: ModelDefinition<User> = Model.extend({ name: 'user', id: 0 });

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
        const count = qp.count ? parseInt(qp.count) : null;
        const allUsers = schema.all('user');

        if (page === null || count === null) {
          return new MockResponse(200, {}, JSON.stringify({ users: allUsers.models }));
        }

        const start = page * count;
        const end = start + count;
        const nextPageCursor = end >= allUsers?.models.length ? null : page + 1;

        const paginatedUsers = allUsers.models.slice(start, end);
        return new MockResponse(200, {}, JSON.stringify({ users: paginatedUsers, nextPage: nextPageCursor }));
      });

      this.passthrough(`${process.env.REACT_APP_API_URL}/**`);
    },
  });
};
