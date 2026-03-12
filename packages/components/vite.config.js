import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { createReactLibConfig } from '@bbki.ng/config/vite/react-lib';

const baseConfig = createReactLibConfig({
  rootDir: __dirname,
  entry: path.resolve(__dirname, 'lib/index.ts'),
  name: 'bbcomponents',
});

export default defineConfig({
  ...baseConfig,
  plugins: [
    react(),
    dts({
      entryRoot: path.resolve(__dirname, 'lib'),
      outputDir: path.resolve(__dirname, 'dist/types'),
      exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
      insertTypesEntry: true,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    },
  },
});
