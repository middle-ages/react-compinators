import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    typecheck: {
      enabled: true,
    },
    setupFiles: ['./src/test.setup.ts'],
    include: ['./src/**/*.test.{ts,tsx}', './src/**/*.test-d.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './node_modules/.coverage',
      exclude: ['./dist', './config'],
    },
  },
})
