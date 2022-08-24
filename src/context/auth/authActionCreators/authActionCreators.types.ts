export enum AuthActionType {
  setTokens = 'set-tokens',
  resetTokens = 'reset-tokens',
  setIsAuthenticated = 'set-is-authenticated',
}

export type SetTokensPayload = {
  accessToken: string;
  refreshToken: string;
  expires: number;
};

export type SetTokensAction = {
  type: AuthActionType.setTokens;
  payload: SetTokensPayload;
};

export type ResetTokensAction = {
  type: AuthActionType.resetTokens;
};

export type AuthAction = SetTokensAction | ResetTokensAction;
