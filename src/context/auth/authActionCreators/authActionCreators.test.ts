import { SET_AUTHORIZED, SET_TOKENS, SET_UNAUTHORIZED, START_AUTHORIZING, LOGOUT } from '../authReducer/authReducer';
import { logout, setAuthorized, setTokens, setUnauthorized, startAuthorizing } from './authActionCreators';

describe('authActionCreators', () => {
  test('creates setAuthorized action', () => {
    const user = {
      firstName: 'Foo',
      lastName: 'Bar',
      username: 'bar',
    };

    expect(setAuthorized(user)).toEqual({
      type: SET_AUTHORIZED,
      user,
    });
  });

  test('creates setUnauthorized action', () => {
    expect(setUnauthorized()).toEqual({
      type: SET_UNAUTHORIZED,
    });
  });

  test('creates setTokens action', () => {
    const accessToken = 'foo';
    const refreshToken = 'bar';

    expect(setTokens(accessToken, refreshToken)).toEqual({
      type: SET_TOKENS,
      accessToken,
      refreshToken,
    });
  });

  test('creates logout action', () => {
    expect(logout()).toEqual({
      type: LOGOUT,
    });
  });

  test('creates startAuthorizing action', () => {
    expect(startAuthorizing()).toEqual({
      type: START_AUTHORIZING,
    });
  });
});
