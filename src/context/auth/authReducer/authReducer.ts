import { Reducer } from 'react';

import { AuthAction, AuthActionType } from '../authActionCreators/authActionCreators.types';

import { AuthState } from './authReducer.types';

export const authReducer: Reducer<AuthState, AuthAction> = (prevState, action) => {
  switch (action.type) {
    case AuthActionType.setTokens:
      return {
        ...prevState,
        ...action.payload,
      };
    case AuthActionType.resetTokens:
      return {
        ...prevState,
        accessToken: null,
        refreshToken: null,
        expires: null,
      };
    default:
      return prevState;
  }
};
