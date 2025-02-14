import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '.dev',
    reportCompressedSize: true,
  },
  // https://github.com/storybookjs/storybook/issues/30335
  assetsInclude: ['/sb-preview/runtime.js'],
  // https://github.com/storybookjs/storybook/issues/30480
  logLevel: 'error',
  resolve: {
    conditions: ['internal'],
  },
})
