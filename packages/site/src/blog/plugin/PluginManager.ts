import { Plugin, PluginConfig } from "./Plugin";
import { Dependencies } from "@/plugin/Dependencies";
import { PluginManagerPayload } from "@/plugin/PluginManagerPayload";
import { PluginEvent } from "@/plugin/PluginEvent";

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
    window.dispatchEvent(new CustomEvent(evt, { detail: data }));
  }

  static addEventListener<T>(evt: PluginEvent, cb: (data: T) => void) {
    window.addEventListener(evt, (e) => {
      cb((e as CustomEvent<T>).detail);
    });
  }

  static removeEventListener<T>(evt: PluginEvent, cb: (data: T) => void) {
    window.removeEventListener(evt, (e) => {
      cb((e as CustomEvent<T>).detail);
    });
  }

  static async init(dependencies: Dependencies) {
    if (PluginManager.instance) {
      return;
    }

    PluginManager.instance = new PluginManager(dependencies);
    dependencies.loading(true);
    await PluginManager.instance.fetchPluginConfig();
    await PluginManager.instance.restoreInstalledPlugins();
    dependencies.loading(false);
    // dependencies.toast("Plugin manager initialized");
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

  async fetchPluginConfig(): Promise<Map<number, PluginConfig>> {
    if (this.pluginConfigMap.size > 0) {
      return this.pluginConfigMap;
    }

    this.pluginConfigMap.set(1, {
      name: "now",
      id: 1,
      version: "1.0.0",
      description: "A now page plugin",
      url: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/plugins/now.wasm",
      status: 0,
      route: "近况",
    });

    // this.pluginConfigMap.set(2, {
    //   name: "core",
    //   id: 2,
    //   version: "1.0.0",
    //   description: "core",
    //   url: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/plugins/reactable.core.wasm",
    //   status: 0,
    //   builtIn: true,
    // })

    return this.pluginConfigMap;
  }
}
