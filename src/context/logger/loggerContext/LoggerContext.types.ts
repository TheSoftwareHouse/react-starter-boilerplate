import { ErrorLoggerEvent } from '../Logger.types';
import { LoggerConfig } from '../loggerService/LoggerService.types';

export type LoggerContextValueType = {
  initialize: (config: LoggerConfig) => void;
  error?: ErrorLoggerEvent;
  info?: ErrorLoggerEvent;
  debug?: ErrorLoggerEvent;
  trace?: ErrorLoggerEvent;
  warn?: ErrorLoggerEvent;
};
