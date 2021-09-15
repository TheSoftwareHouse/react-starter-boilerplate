import { createContext } from 'react';
import axios, { AxiosInstance } from 'axios';

export const ClientContext = createContext<AxiosInstance>(axios);
