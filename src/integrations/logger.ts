import {
  init,
  captureException,
  captureMessage,
  browserTracingIntegration,
  httpClientIntegration,
  captureConsoleIntegration,
} from '@sentry/browser';

type LogLevel = 'error' | 'info' | 'warning';
type Logger = Record<LogLevel, (message: string | Error) => void> & Record<string, unknown>;

const initLogger = () =>
  init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      httpClientIntegration({
        failedRequestStatusCodes: [[400, 599]],
        failedRequestTargets: [/.*/],
      }),
      captureConsoleIntegration(),
      browserTracingIntegration(),
    ],
    tracesSampleRate: 1.0,
  });

const sendLog = (level: LogLevel, message: string | Error) => {
  if (typeof message === 'string') {
    captureMessage(message, { level });
  }
  captureException(message, { level });
};

export const logger = {
  init: initLogger,
  error: (message: string | Error) => sendLog('error', message),
  warning: (message: string | Error) => sendLog('warning', message),
  info: (message: string | Error) => sendLog('info', message),
} satisfies Logger;
