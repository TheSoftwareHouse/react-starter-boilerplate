import { LoggerConfig, LoggerProps } from './LoggerService.types';

class LoggerService {
  logger: LoggerProps;
  private _config: LoggerConfig | null;

  constructor(config: LoggerConfig, logger: LoggerProps) {
    this.logger = logger;
    this._config = config;
  }

  initialize(config: LoggerConfig) {
    this._config = config;
    if (this.logger) {
      this.logger.initialize(this._config);
    }
  }

  warn(messageData: unknown) {
    this._sendLog('warn', messageData);
  }

  debug(messageData: unknown) {
    this._sendLog('debug', messageData);
  }

  info(messageData: unknown) {
    this._sendLog('info', messageData);
  }
  trace(messageData: unknown) {
    this._sendLog('trace', messageData);
  }

  error(messageData: unknown) {
    this._sendLog('error', messageData);
  }

  private _sendLog(logType: keyof Omit<LoggerProps, 'initialize'>, messageData: unknown) {
    if (this.logger) {
      const logMethod = this.logger[logType];
      logMethod ? logMethod(messageData) : undefined;
    }
  }
}

const config: LoggerConfig = {
  environment: import.meta.env.VITE_APP_ENVIRONMENT,
};

const props: LoggerProps = {
  initialize: (config: LoggerConfig) => config,
  error: (config: unknown) => config,
};

export const loggerService = new LoggerService(config, props);
