import { LoggerConfig } from '../loggerService/LoggerService.types';

export type LoggerContextValueType = {
  initialize: (config: LoggerConfig) => void;
  error?: (messageData: unknown) => void;
  info?: (messageData: unknown) => void;
  debug?: (messageData: unknown) => void;
  trace?: (messageData: unknown) => void;
  warn?: (messageData: unknown) => void;
};
