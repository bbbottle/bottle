import { IHostContext } from './hostApi';

export interface IPlugin {
  id: string;
  name: string;
  description?: string;
  version: string;
  author?: string;

  onInstall?: (ctx: IHostContext) => void;
  onDisable?: () => Promise<void> | void;
  onDestroy?: () => void;
}
