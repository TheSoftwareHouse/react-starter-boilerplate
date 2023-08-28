import { ReactNode } from 'react';

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export type LoggerContextControllerProps = {
  children: ReactNode;
};
