import { IHostApi, IHostContext } from 'src/types/hostApi';
import { registry } from './registry';
import type { SlotName, HookPoint } from 'src/types/slots';
import { IPlugin } from 'src/types/plugin';

class PluginManager {
  private activePlugins: Map<string, IPlugin> = new Map();

  private createHostContext(): IHostContext {
    return {
      api: {
        registerMiddleware: (point: HookPoint, fn: Function, pluginId: string, weight = 0) => {
          registry.registerMiddleware(point, fn, pluginId, weight);
        },
        registerSlot: (
          slotName: SlotName,
          component: React.ComponentType<any>,
          pluginId: string,
          weight = 0
        ) => {
          registry.registerComponent(slotName, component, pluginId, weight);
        },
      },
    };
  }

  async loadPlugin(plugin: IPlugin) {
    if (this.activePlugins.has(plugin.name)) {
      console.warn(`Plugin ${plugin.name} is already loaded.`);
      return;
    }

    // try load plugin
    try {
      const module = await import(`../plugins/${plugin.name}`);
      const p: IPlugin = module.default;

      const ctx = this.createHostContext();

      if (p.onInstall) {
        p.onInstall(ctx);
      }

      this.activePlugins.set(plugin.name, p);
    } catch (error) {
      console.error(`Failed to load plugin ${plugin.name}:`, error);
    }
  }

  async disablePlugin(pluginName: string) {
    const plugin = this.activePlugins.get(pluginName);
    if (!plugin) {
      console.warn(`Plugin ${pluginName} is not loaded.`);
      return;
    }

    if (plugin.onDisable) {
      await plugin.onDisable();
    }

    this.activePlugins.delete(pluginName);

    registry.unregisterAllByPluginId(plugin.id);
  }
}

export const pluginManager = new PluginManager();
