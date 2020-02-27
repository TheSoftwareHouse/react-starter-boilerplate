import { createClient } from 'react-fetching-library';

import { requestHostInterceptor } from './requestHostInterceptor';

describe('requestHostInterceptor', () => {
  test('prefixes endpoint with given host', async () => {
    const host = 'https://api.tsh.io';
    const client = createClient();
    const action = {
      endpoint: '/authorize',
    };

    expect(await requestHostInterceptor(host)(client)(action)).toEqual({
      endpoint: 'https://api.tsh.io/authorize',
    });
  });

  test('returns passed action if endpoints starts with https', async () => {
    const host = 'https://api.tsh.io';
    const client = createClient();
    const action = {
      endpoint: 'https://oauth.tsh.io/authorize',
    };

    expect(await requestHostInterceptor(host)(client)(action)).toEqual({
      endpoint: 'https://oauth.tsh.io/authorize',
    });
  });

  test('returns passed action if endpoints starts with http', async () => {
    const host = 'http://api.tsh.io';
    const client = createClient();
    const action = {
      endpoint: 'http://oauth.tsh.io/authorize',
    };

    expect(await requestHostInterceptor(host)(client)(action)).toEqual({
      endpoint: 'http://oauth.tsh.io/authorize',
    });
  });

  test('returns passed action if endpoints starts with double slash', async () => {
    const host = 'https://api.tsh.io';
    const client = createClient();
    const action = {
      endpoint: '//oauth.tsh.io/authorize',
    };

    expect(await requestHostInterceptor(host)(client)(action)).toEqual({
      endpoint: '//oauth.tsh.io/authorize',
    });
  });
});
