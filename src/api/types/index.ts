import { Action as BaseAction } from 'react-fetching-library';

export type AdditionalProperties = {
  skipAuthorization?: boolean;
};

export type Action<R> = BaseAction<R, AdditionalProperties>;
