import { IHostContext } from '#/types/hostApi';
import { registry } from './registry';
import type { SlotName, HookPoint } from '#/types/slots';
import { IPlugin } from '#/types/plugin';

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

  private loading = new Set<string>();

  // enable abort ctrl
  async loadPlugin(pluginId: string) {
    if (this.activePlugins.has(pluginId)) {
      console.warn(`Plugin ${pluginId} is already loaded.`);
      return;
    }

    if (this.loading.has(pluginId)) {
      console.warn(`Plugin ${pluginId} is loading...`);
      return;
    }

    // try load plugin
    this.loading.add(pluginId);

    try {
      const module = await import(`../plugins/${pluginId}`);

      const p: IPlugin = module.default;

      const ctx = this.createHostContext();

      if (p.onInstall) {
        p.onInstall(ctx);
      }

      this.activePlugins.set(pluginId, p);
    } catch (error) {
      console.error(`Failed to load plugin ${pluginId}:`, error);
    } finally {
      this.loading.delete(pluginId);
    }
  }

  async disablePlugin(pluginId: string) {
    const plugin = this.activePlugins.get(pluginId);
    if (!plugin) {
      console.warn(`Plugin ${pluginId} is not loaded.`);
      return;
    }

    if (plugin.onDisable) {
      await plugin.onDisable();
    }

    this.activePlugins.delete(pluginId);

    registry.unregisterAllByPluginId(plugin.id);
  }
}

export const pluginManager = new PluginManager();
