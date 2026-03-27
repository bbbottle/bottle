import { HookPoint, SlotName } from './slots';

export interface IHostApi {
  registerMiddleware: (point: HookPoint, fn: Function, pluginId: string, weight?: number) => void;
  registerSlot: (
    slotName: SlotName,
    component: React.ComponentType<any>,
    pluginId: string,
    weight?: number
  ) => void;
}

export type PluginInitializer = (api: IHostApi) => void;

export interface IHostContext {
  api: IHostApi;
}
