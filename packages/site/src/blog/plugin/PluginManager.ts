import { Plugin, PluginConfig, PluginInputFieldType } from "./Plugin";
import { Dependencies } from "@/plugin/Dependencies";
import { PluginManagerPayload } from "@/plugin/PluginManagerPayload";

export class PluginManager {
  private readonly dependencies: Dependencies;

  constructor(dependencies: Dependencies) {
    this.dependencies = dependencies;
    this.loadInfo();
  }

  private _info: PluginManagerPayload = {
    installedIdList: [],
  };
  private static payloadKey = "pluginManagerPayload_v1.0";

  private saveInfo() {
    if (!this._info) {
      return;
    }

    this._info.installedIdList = this.listInstalled().map((p) => p.config.id);
    localStorage.setItem(PluginManager.payloadKey, JSON.stringify(this._info));
  }

  private loadInfo() {
    const info = localStorage.getItem(PluginManager.payloadKey);
    if (info) {
      this._info = JSON.parse(info);
      console.log(this._info);
    }
  }

  private async restoreInstalledPlugins() {
    if (!this._info) {
      return Promise.resolve();
    }

    return Promise.all(
      this._info.installedIdList.map((id) => this.install(id))
    );
  }

  static instance: PluginManager;

  static async init(dependencies: Dependencies) {
    if (PluginManager.instance) {
      return;
    }

    PluginManager.instance = new PluginManager(dependencies);
    dependencies.loading(true);
    await PluginManager.instance.fetchPluginConfig();
    await PluginManager.instance.restoreInstalledPlugins();
    dependencies.loading(false);
    dependencies.toast("Plugin manager initialized");

    // @ts-ignore
    // expose plugin manager to window for debugging
    window.pm = PluginManager.instance;
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

    this.saveInfo();
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

    this.saveInfo();
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

  public async runWithParam(id: number, method: string, userInput: string) {
    const plugin = this.plugins.get(id);
    if (!plugin) {
      this.dependencies.toast("Plugin not found");
      return;
    }

    return plugin.runWithParam(method, userInput);
  }

  private pluginConfigMap: Map<number, PluginConfig> = new Map();

  private plugins: Map<number, Plugin> = new Map();

  async fetchPluginConfig(): Promise<Map<number, PluginConfig>> {
    if (this.pluginConfigMap.size > 0) {
      return this.pluginConfigMap;
    }

    this.pluginConfigMap.set(1, {
      name: "now",
      id: 1,
      version: "1.0.0",
      description: "A now page plugin",
      url: "http://localhost:5173/now.wasm",
      status: 0,
      route: "近况",
    });

    return this.pluginConfigMap;
  }
}
