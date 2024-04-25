import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { configDefaults } from 'vitest/config';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

const manualChunks = (id: string) => {
  if (id.includes('@sentry')) {
    return 'sentry';
  }
};

/* eslint-disable import/no-default-export */
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@welldone-software/why-did-you-render',
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
    TanStackRouterVite(),
  ],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
    clearMocks: true,
    exclude: [...configDefaults.exclude, 'e2e/**/*', 'e2e-playwright/**/*'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
