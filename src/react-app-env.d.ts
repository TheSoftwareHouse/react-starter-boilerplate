/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    VITE_DEFAULT_LOCALE: string;
    VITE_API_URL: string;
    VITE_CI: number;
  }
}
