import { GetMeQueryResponse, LoginMutationArguments } from 'api/actions/auth/auth.types';
import { TokenData } from 'context/auth/authStorage/AuthStorage.types';

export type AuthContextValue = TokenData & {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: ({ password, username }: LoginMutationArguments) => void;
  logout: VoidFunction;
  user: GetMeQueryResponse | undefined;
};
