import { fetchCurrentUserAction } from './userActions';

describe('userActions', () => {
  test('returns correct fetchCurrentUser action', () => {
    expect(fetchCurrentUserAction()).toEqual({
      method: 'GET',
      endpoint: '/users/me',
    });
  });
});
