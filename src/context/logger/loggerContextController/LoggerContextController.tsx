import { useState } from 'react';

import { LoggerContext } from '../loggerContext/LoggerContext';
import { loggerService } from '../loggerService/LoggerService';

import { LoggerContextControllerProps } from './LoggerContextController.types';

export const LoggerContextController = ({ children }: LoggerContextControllerProps) => {
  const [state] = useState(loggerService.logger);

  return <LoggerContext.Provider value={state}>{children}</LoggerContext.Provider>;
};
