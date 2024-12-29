import { Plugin, PluginConfig } from "./Plugin";
import { Dependencies } from "@/plugin/core/Dependencies";

export class PluginManager {
  private readonly dependencies: Dependencies;

  constructor(dependencies: Dependencies) {
    this.dependencies = dependencies;
  }

  static instance: PluginManager;

  static init(dependencies: Dependencies) {
    PluginManager.instance = new PluginManager(dependencies);
  }

  private configList: PluginConfig[] = [];

  getConfigList() {
    return this.configList;
  }

  async fetchPluginConfig(): Promise<PluginConfig[]> {
    if (this.configList.length !== 0) {
      return this.configList;
    }

    this.configList = [
      {
        name: "greet",
        id: 1,
        version: "1.0.0",
        description: "A greet plugin",
        url: "http://localhost:5173/demo.wasm",
      },
    ];

    return this.configList;
  }
}
