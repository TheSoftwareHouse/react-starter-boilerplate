import { createClient } from 'react-fetching-library';

import { requestAuthInterceptor } from './requestAuthInterceptor';

describe('requestAuthInterceptor', () => {
  test('adds Authorization header', async () => {
    const accessToken = 'ACCESS_TOKEN';
    const client = createClient();
    const action = {
      foo: 'bar',
    };

    expect(await requestAuthInterceptor(accessToken)(client)(action)).toEqual({
      foo: 'bar',
      headers: {
        Authorization: 'Bearer ACCESS_TOKEN',
      },
    });
  });

  test('adds empty Authorization header if access token is null', async () => {
    const client = createClient();
    const action = {
      foo: 'bar',
    };

    expect(await requestAuthInterceptor(null)(client)(action)).toEqual({
      foo: 'bar',
      headers: {
        Authorization: 'Bearer ',
      },
    });
  });

  test('returns passed action if skipAuthorization parameter is present', async () => {
    const accessToken = 'ACCESS_TOKEN';
    const client = createClient();
    const action = {
      foo: 'bar',
      config: {
        skipAuthorization: true,
      },
    };

    expect(await requestAuthInterceptor(accessToken)(client)(action)).toEqual({
      foo: 'bar',
      config: {
        skipAuthorization: true,
      },
    });
  });
});
