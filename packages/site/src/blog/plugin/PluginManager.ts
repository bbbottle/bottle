import { Plugin, PluginConfig } from "./Plugin";
import { Dependencies } from "@/plugin/Dependencies";
import { PluginManagerPayload } from "@/plugin/PluginManagerPayload";
import { PluginEvent, PluginEventMgr } from "@/plugin/PluginEvent";

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
    await Promise.all(this.listBuiltIn().map((p) => this.install(p.id)));

    if (!this._info) {
      return Promise.resolve();
    }

    return Promise.all(
      this._info.installedIdList.map((id) => this.install(id))
    );
  }

  static instance: PluginManager;

  static dispatchEvent<T>(evt: PluginEvent, data: T) {
    PluginEventMgr.dispatchEvent(evt, data);
  }

  static addEventListener<T>(evt: PluginEvent, cb: (data: T) => void) {
    PluginEventMgr.addEventListener(evt, cb);
  }

  static removeEventListener<T>(evt: PluginEvent, cb: (data: T) => void) {
    PluginEventMgr.removeEventListener(evt, cb);
  }

  static async init(dependencies: Dependencies) {
    if (PluginManager.instance) {
      return;
    }

    PluginManager.instance = new PluginManager(dependencies);
    dependencies.loading(true);
    const remotePlugins = await dependencies.fetchPlugins();
    remotePlugins.forEach((p: PluginConfig) => PluginManager.instance.pluginConfigMap.set(p.id, p));

    await PluginManager.instance.restoreInstalledPlugins();
    dependencies.loading(false);
    // dependencies.toast("Plugins initialized");
    PluginManager.dispatchEvent<null>(PluginEvent.INIT, null);

    // @ts-ignore
    // expose plugin manager to window for debugging
    window.pm = PluginManager.instance;
  }

  public async install(id: number, showToast?: boolean) {
    const config = this.pluginConfigMap.get(id);
    if (!config) {
      this.dependencies.toast("Plugin not found");
      return;
    }

    const plugin = new Plugin(config, this.dependencies);
    await plugin.install();
    this.plugins.set(id, plugin);

    if (showToast) {
      this.dependencies.toast("Plugin installed");
    }

    // dispatch event
    PluginManager.dispatchEvent<PluginConfig>(PluginEvent.INSTALL, config);

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

    // dispatch event
    PluginManager.dispatchEvent<PluginConfig>(PluginEvent.UNINSTALL, plugin);

    this.saveInfo();
  }

  public listInstalled() {
    return Array.from(this.plugins.values());
  }

  public listAvailable(): PluginConfig[] {
    return Array.from(this.pluginConfigMap.values()).filter((p) => !p.builtIn);
  }

  public listBuiltIn(): PluginConfig[] {
    return Array.from(this.pluginConfigMap.values()).filter((p) => p.builtIn);
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
}
