import path from 'path';
import { fileURLToPath } from 'url';
import { createBaseConfig, createLibBuild } from './base.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Creates a Vite configuration for React component libraries
 * @param {Object} options - Configuration options
 * @param {string} options.rootDir - Root directory of the package
 * @param {string} options.entry - Entry point path
 * @param {string} options.name - Library name
 * @param {string[]} [options.external=['react', 'react-dom', 'react-router-dom']] - External dependencies
 * @returns {Object} Vite configuration object
 */
export function createReactLibConfig({
  rootDir,
  entry,
  name,
  external = ['react', 'react-dom', 'react-router-dom'],
}) {
  const baseConfig = createBaseConfig(rootDir);

  return {
    ...baseConfig,
    build: createLibBuild({ entry, name, external }),
    server: {
      port: 3000,
      open: true,
    },
  };
}

export { createBaseConfig, createLibBuild };
