import { AuthActionType, ResetTokensAction, SetTokensAction, SetTokensPayload } from './authActionCreators.types';

export const setTokens = (payload: SetTokensPayload): SetTokensAction => ({
  type: AuthActionType.setTokens,
  payload,
});

export const resetTokens = (): ResetTokensAction => ({
  type: AuthActionType.resetTokens,
});
