import { QueryResponse } from 'react-fetching-library';
import { LoginPayload } from 'api/actions/auth/authActions.types';
import { FetchCurrentUserResponse } from 'api/actions/user/userActions.types';

export type LoginProps = {
  onSubmit(payload: LoginPayload): Promise<QueryResponse>;
  fetchCurrentUser: Promise<QueryResponse<FetchCurrentUserResponse>>;
};
