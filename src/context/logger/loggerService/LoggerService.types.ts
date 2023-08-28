import { Environment } from '../loggerContextController/LoggerContextController.types';

export type LoggerConfig = {
  environment: Environment;
  accessToken?: string;
  [index: string]: unknown;
};

export interface LoggerProps {
  initialize: (config: LoggerConfig) => void;
  error?: (messageData: unknown) => void;
  info?: (messageData: unknown) => void;
  debug?: (messageData: unknown) => void;
  trace?: (messageData: unknown) => void;
  warn?: (messageData: unknown) => void;
}
