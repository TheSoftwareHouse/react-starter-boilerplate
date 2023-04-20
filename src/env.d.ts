interface ImportMetaEnv {
  readonly VITE_DEFAULT_LOCALE: string;
  readonly VITE_API_URL: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_CI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
