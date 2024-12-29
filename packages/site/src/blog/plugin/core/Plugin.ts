import createPlugin, { Plugin as EPlugin } from "@extism/extism";
import { Dependencies } from "@/plugin/core/Dependencies";
import { hostFuncAdapter } from "@/plugin/core/HostFuncAdapter";

export type PluginConfig = {
  name: string;
  id: number;
  version: string;
  description: string;
  url: string;
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
  }

  async run(input: T): Promise<T2> {
    let out = await this.plugin.call(this.config.name, JSON.stringify(input));
    return JSON.parse(out.text());
  }

  async uninstall() {
    await this.plugin.close();
  }
}
