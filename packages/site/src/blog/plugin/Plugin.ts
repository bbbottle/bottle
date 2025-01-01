import createPlugin, { Plugin as EPlugin } from "@extism/extism";
import { Dependencies } from "@/plugin/Dependencies";
import { hostFuncAdapter } from "@/plugin/HostFuncAdapter";

export enum PluginStatus {
  Available,
  Installed,
  Running,
  Stopped,
}

export type PluginConfig = {
  name: string;
  id: number;
  version: string;
  description: string;
  url: string;
  status: PluginStatus;
};

export class Plugin<T, T2> {
  config: PluginConfig;

  constructor(config: PluginConfig) {
    this.config = config;
  }

  private plugin: EPlugin;

  async install(dependencies: Dependencies) {
    this.plugin = await createPlugin(this.config.url, {
      useWasi: true,
      functions: hostFuncAdapter(dependencies),
    });

    this.config.status = PluginStatus.Installed;
  }

  async run(input: T): Promise<T2> {
    this.config.status = PluginStatus.Running;
    let out = await this.plugin.call(this.config.name, JSON.stringify(input));
    try {
      this.config.status = PluginStatus.Stopped;
      return JSON.parse(out.text());
    } catch (e) {
      this.config.status = PluginStatus.Stopped;
      return out.text();
    }
  }

  async uninstall() {
    this.config.status = PluginStatus.Available;
  }
}
