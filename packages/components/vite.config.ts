import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      name: '@bbki.ng/components',
      fileName: 'components',
      entry: resolve(__dirname, 'lib/index.ts')
    },
    rollupOptions: {
      external: [
        'react',
        'classnames',
        'react-router-dom'
      ]
    }
  }
})
