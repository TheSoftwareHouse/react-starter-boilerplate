import { createContext } from 'react';

import { AuthDispatchContextType, AuthStateContextType } from './AuthContext.types';

export const AuthStateContext = createContext<AuthStateContextType | undefined>(undefined);
export const AuthDispatchContext = createContext<AuthDispatchContextType | undefined>(undefined);
