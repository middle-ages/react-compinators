import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [react()],
  // https://github.com/storybookjs/storybook/issues/30335
  assetsInclude: ['/sb-preview/runtime.js'],
  // https://github.com/storybookjs/storybook/issues/30480
  logLevel: 'error',
})
