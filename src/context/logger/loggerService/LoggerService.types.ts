import { ErrorLoggerEvent } from '../Logger.types';
import { Environment } from '../loggerContextController/LoggerContextController.types';

export type LoggerConfig = {
  environment: Environment;
  accessToken?: string;
  [index: string]: unknown;
};

export interface LoggerProps {
  initialize: (config: LoggerConfig) => void;
  error?: ErrorLoggerEvent;
  info?: ErrorLoggerEvent;
  debug?: ErrorLoggerEvent;
  trace?: ErrorLoggerEvent;
  warn?: ErrorLoggerEvent;
}
