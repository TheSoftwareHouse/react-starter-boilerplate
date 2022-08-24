import { GetMeQueryResponse, LoginMutationArguments } from 'api/actions/auth/authActions.types';
import { AuthState } from '../authReducer/authReducer.types';

export type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: ({ password, username }: LoginMutationArguments) => void;
  logout: VoidFunction;
  user: GetMeQueryResponse | undefined;
};
