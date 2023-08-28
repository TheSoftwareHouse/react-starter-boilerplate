import { createContext } from 'react';

import { LoggerContextValueType } from './LoggerContext.types';

export const LoggerContext = createContext<LoggerContextValueType | undefined>(undefined);
