import { BaseConfig, LibBuildConfig, LibBuildOptions } from './base';

export interface ReactLibConfigOptions {
  rootDir: string;
  entry: string;
  name: string;
  external?: string[];
}

export interface ReactLibConfig extends BaseConfig {
  build: LibBuildConfig;
  server: {
    port: number;
    open: boolean;
  };
}

/**
 * Creates a Vite configuration for React component libraries
 * @param options - Configuration options
 * @returns Vite configuration object
 */
export function createReactLibConfig(options: ReactLibConfigOptions): ReactLibConfig;

export {
  createBaseConfig,
  createLibBuild,
  BaseConfig,
  LibBuildConfig,
  LibBuildOptions,
} from './base';
