import { Plugin, PluginConfig, PluginInputFieldType } from "./Plugin";
import { Dependencies } from "@/plugin/Dependencies";

export class PluginManager {
  private readonly dependencies: Dependencies;

  constructor(dependencies: Dependencies) {
    this.dependencies = dependencies;
  }

  static instance: PluginManager;

  static async init(dependencies: Dependencies) {
    if (PluginManager.instance) {
      return;
    }

    PluginManager.instance = new PluginManager(dependencies);

    dependencies.loading(true);
    await PluginManager.instance.fetchPluginConfig();
    dependencies.loading(false);
    dependencies.toast("Plugin manager initialized");
  }

  public async install(id: number) {
    const config = this.pluginConfigMap.get(id);
    if (!config) {
      this.dependencies.toast("Plugin not found");
      return;
    }

    const plugin = new Plugin(config, this.dependencies);
    await plugin.install();
    this.plugins.set(id, plugin);
    this.dependencies.toast("Plugin installed");
  }

  public async uninstall(plugin: PluginConfig) {
    const id = plugin.id;
    const installed = this.plugins.get(id);
    if (!installed) {
      this.dependencies.toast("Plugin not found");
      return;
    }

    await installed.uninstall();
    this.plugins.delete(id);
    this.dependencies.toast("Plugin uninstalled");
  }

  public listInstalled() {
    return Array.from(this.plugins.values());
  }

  public listAvailable(): PluginConfig[] {
    return Array.from(this.pluginConfigMap.values());
  }

  public getPlugin(id: number) {
    return this.plugins.get(id);
  }

  public getPluginByRoute(route: string) {
    return Array.from(this.plugins.values()).find(
      (plugin) => plugin.config.route === route
    );
  }

  public async run(id: number, method?: string) {
    const plugin = this.plugins.get(id);
    if (!plugin) {
      this.dependencies.toast("Plugin not found");
      return;
    }

    return plugin.run(method);
  }

  private pluginConfigMap: Map<number, PluginConfig> = new Map();

  private plugins: Map<number, Plugin> = new Map();

  async fetchPluginConfig(): Promise<Map<number, PluginConfig>> {
    if (this.pluginConfigMap.size > 0) {
      return this.pluginConfigMap;
    }

    this.pluginConfigMap.set(1, {
      name: "greet",
      id: 1,
      version: "1.0.0",
      description: "A greet plugin",
      url: "http://localhost:5173/demo.wasm",
      status: 0,
      route: "greet",
      inputs: [
        {
          name: "content",
          type: PluginInputFieldType.String,
        },
      ],
    });

    return this.pluginConfigMap;
  }
}
