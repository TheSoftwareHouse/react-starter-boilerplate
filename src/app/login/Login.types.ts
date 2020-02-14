import { LoginPayload } from 'api/actions/auth/authActions.types';

export type LoginProps = {
  onSubmit(payload: LoginPayload): Promise<boolean>;
};
