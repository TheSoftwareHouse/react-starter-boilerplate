import { useContext } from 'react';

import { LoggerContext } from 'context/logger/loggerContext/LoggerContext';

export const useLogger = () => {
  const context = useContext(LoggerContext);
  if (context === undefined) {
    throw new Error('LoggerContext must be within LoggerProvider');
  }

  return context;
};
