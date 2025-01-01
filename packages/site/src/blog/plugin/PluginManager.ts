import { Plugin, PluginConfig } from "./Plugin";
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

    // Expose the plugin manager to the window object for debugging
    // @ts-ignore
    window.pm = PluginManager.instance;
  }

  public async install(id: number) {
    const config = this.pluginConfigMap.get(id);
    if (!config) {
      this.dependencies.toast("Plugin not found");
      return;
    }

    const plugin = new Plugin(config);
    await plugin.install(this.dependencies);
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

  public getInstalled() {
    return this.plugins;
  }

  public listAvailable(): PluginConfig[] {
    return Array.from(this.pluginConfigMap.values());
  }

  public async run<T1, T2>(id: number, input: T1) {
    const plugin = this.plugins.get(id) as Plugin<T1, T2>;
    if (!plugin) {
      this.dependencies.toast("Plugin not found");
      return;
    }

    return plugin.run(input);
  }

  private pluginConfigMap: Map<number, PluginConfig> = new Map();

  private plugins: Map<number, Plugin<any, any>> = new Map();

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
    });

    return this.pluginConfigMap;
  }
}
