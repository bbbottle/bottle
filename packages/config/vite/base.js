import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Base Vite configuration shared across packages
 * @param {string} rootDir - The root directory of the package
 * @returns {Object} Base Vite configuration
 */
export function createBaseConfig(rootDir) {
  return {
    resolve: {
      alias: {
        '@': path.resolve(rootDir, 'lib'),
      },
    },
  };
}

/**
 * Common build options for library packages
 * @param {Object} options - Library options
 * @param {string} options.entry - Entry point path
 * @param {string} options.name - Library name
 * @param {string[]} options.external - External dependencies
 * @returns {Object} Library build configuration
 */
export function createLibBuild({ entry, name, external = [] }) {
  return {
    lib: {
      entry,
      name,
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external,
      output: {
        preserveModules: true,
        preserveModulesRoot: 'lib',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  };
}
