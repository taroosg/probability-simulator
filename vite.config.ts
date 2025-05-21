import react from '@vitejs/plugin-react-swc';
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  base: '/probability-simulator/',
});
