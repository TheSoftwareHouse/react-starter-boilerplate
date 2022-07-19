import { createContext } from 'react';

import { AuthContextValue } from './AuthContext.types';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
