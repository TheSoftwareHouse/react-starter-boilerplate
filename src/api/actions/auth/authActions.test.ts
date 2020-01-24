import { loginAction } from './authActions';

describe('authActions', () => {
  test('returns correct login action', () => {
    const values = {
      username: 'foo',
      password: 'bar',
    };

    expect(loginAction(values)).toEqual({
      method: 'POST',
      endpoint: '/authorize',
      body: values,
    });
  });
});
