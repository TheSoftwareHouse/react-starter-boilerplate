import {
  GetMeQueryResponse,
  GetUsersResponse,
  LoginMutationArguments,
  LoginMutationResponse,
} from 'api/actions/auth/authActions.types';

import { rest } from './rest';

const authorizeHandler = rest.post<LoginMutationArguments, never, LoginMutationResponse>(
  '/authorize',
  async (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
        tokenType: 'bearer',
        expires: 123,
        refreshToken: 'IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk',
      }),
    ),
);
const meHandler = rest.get<GetMeQueryResponse>('/me', async (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      firstName: 'Mike',
      lastName: 'Tyson',
      username: 'mike',
    }),
  ),
);

const createUsers = (numUsers = 40) => {
  return Array.from({ length: numUsers }, (el, index) => ({ id: index, name: `User ${index + 1}` }));
};

const usersHandler = rest.get<GetUsersResponse>('/users', (req, res, ctx) => {
  const pageParam = req.url.searchParams.get('page');
  const countParam = req.url.searchParams.get('count');
  const page = pageParam ? parseInt(pageParam) : null;
  const count = countParam ? parseInt(countParam) : null;
  const allUsers = createUsers();

  if (page === null || count === null) {
    return res(
      ctx.status(200),
      ctx.json({
        users: allUsers,
      }),
    );
  }

  const start = page * count;
  const end = start + count;
  const nextPageCursor = end >= allUsers.length ? null : page + 1;
  const paginatedUsers = allUsers.slice(start, end);

  return res(
    ctx.status(200),
    ctx.json({
      users: paginatedUsers,
      nextPage: nextPageCursor,
    }),
  );
});

export const handlers = [authorizeHandler, meHandler, usersHandler];
