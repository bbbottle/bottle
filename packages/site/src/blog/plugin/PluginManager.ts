import { Plugin, PluginConfig } from "./Plugin";
import { Dependencies } from "@/plugin/Dependencies";

export class PluginManager {
  private readonly dependencies: Dependencies;

  constructor(dependencies: Dependencies) {
    this.dependencies = dependencies;
  }

  static instance: PluginManager;
  static init(dependencies: Dependencies) {
    PluginManager.instance = new PluginManager(dependencies);
  }

  async fetchPluginConfig(): Promise<PluginConfig[]> {
    return [
      {
        name: "greet",
        id: 1,
        version: "1.0.0",
        description: "A greet plugin",
        url: "http://localhost:5173/demo.wasm",
      },
    ];
  }

  async installPlugin<T, T1>(plugin: Plugin<T, T1>) {
    await plugin.install(this.dependencies);
  }
}
