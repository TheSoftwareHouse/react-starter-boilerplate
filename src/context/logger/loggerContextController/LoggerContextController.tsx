import { useMemo, useState } from 'react';

import { LoggerContext } from '../loggerContext/LoggerContext';
import { loggerService } from '../loggerService/LoggerService';
import { LoggerContextValueType } from '../loggerContext/LoggerContext.types';

import { LoggerContextControllerProps } from './LoggerContextController.types';

export const LoggerContextController = ({ children }: LoggerContextControllerProps) => {
  const [state] = useState(loggerService.logger);

  const value: LoggerContextValueType = useMemo(
    () => ({
      ...state,
    }),
    [state],
  );

  return <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>;
};
