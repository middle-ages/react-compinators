import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({tsconfigPath: 'config/tsconfig.lib.json'})],
  build: {
    outDir: 'dist',
    lib: {
      entry: ['index.ts'],
      name: 'react-compinators',
      formats: ['es'],
    },
  },
})
