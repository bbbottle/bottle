export interface BaseConfig {
  resolve: {
    alias: {
      [key: string]: string;
    };
  };
}

export interface LibBuildOptions {
  entry: string;
  name: string;
  external?: string[];
}

export interface LibBuildConfig {
  lib: {
    entry: string;
    name: string;
    formats: string[];
    fileName: (format: string, entryName: string) => string;
  };
  rollupOptions: {
    external: string[];
    output: {
      preserveModules: boolean;
      preserveModulesRoot: string;
    };
  };
  outDir: string;
  emptyOutDir: boolean;
}

/**
 * Base Vite configuration shared across packages
 * @param rootDir - The root directory of the package
 * @returns Base Vite configuration
 */
export function createBaseConfig(rootDir: string): BaseConfig;

/**
 * Common build options for library packages
 * @param options - Library options
 * @returns Library build configuration
 */
export function createLibBuild(options: LibBuildOptions): LibBuildConfig;
