import { DefaultBodyType, HttpResponse, PathParams } from 'msw';

import {
  GetMeQueryResponse,
  GetUsersResponse,
  LoginMutationArguments,
  LoginMutationResponse,
} from 'api/actions/auth/auth.types';

import { http } from './http';

const authorizeHandler = http.post<LoginMutationArguments, never, LoginMutationResponse>('/authorize', async () =>
  HttpResponse.json(
    {
      accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
      tokenType: 'bearer',
      expires: 123,
      refreshToken: 'IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk',
    },
    { status: 200 },
  ),
);
const meHandler = http.get<PathParams, DefaultBodyType, GetMeQueryResponse>('/me', async () =>
  HttpResponse.json(
    {
      firstName: 'Mike',
      lastName: 'Tyson',
      username: 'mike',
    },
    { status: 200 },
  ),
);

const createUsers = (numUsers = 40) => {
  return Array.from({ length: numUsers }, (el, index) => ({ id: `${index}`, name: `User ${index + 1}` }));
};

const usersHandler = http.get<PathParams, DefaultBodyType, GetUsersResponse>('/users', ({ request }) => {
  const url = new URL(request.url);

  const pageParam = url.searchParams.get('page');
  const countParam = url.searchParams.get('count');
  const page = pageParam ? parseInt(pageParam) : null;
  const count = countParam ? parseInt(countParam) : null;
  const allUsers = createUsers();

  if (page === null || count === null) {
    return HttpResponse.json({ users: allUsers }, { status: 200 });
  }

  const start = page * count;
  const end = start + count;
  const nextPageCursor = end >= allUsers.length ? null : page + 1;
  const paginatedUsers = allUsers.slice(start, end);

  return HttpResponse.json({ users: paginatedUsers, nextPage: nextPageCursor }, { status: 200 });
});

export const handlers = [authorizeHandler, meHandler, usersHandler];
