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
      exclude: [
	'dist',
	'config',
	'.storybook',
	'storybook-static',
	'src/main.tsx',
	'src/test.ts',
	'src/test.setup.ts',
	'src/internal.d.ts',
	'src/test/**/*',
	'src/storybook/**/*',
	'src/**/*.test.ts',
	'src/**/*.test-d.ts',
	'src/**/*.test.tsx',
	'src/**/*.test-d.tsx',
	'src/**/*.stories.ts',
	'src/**/*.stories.tsx',
      ],
    },
  },
})
