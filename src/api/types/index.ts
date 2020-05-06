import { Action as BaseAction } from 'react-fetching-library';

export type AdditionalProperties = {
  skipAuthorization?: boolean;
  skipRefreshToken?: boolean;
};

export type Action<R = unknown> = BaseAction<R, AdditionalProperties>;
