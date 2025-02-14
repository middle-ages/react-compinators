import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '.dev',
    lib: {
      entry: ['src/index.ts'],
      name: 'react-compinators',
      formats: ['es'],
    },
  },
})
