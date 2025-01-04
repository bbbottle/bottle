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
  inputs?: PluginInput;
  route?: string;
};

export enum PluginInputFieldType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
}

export type PluginInputField = {
  name: string;
  type: PluginInputFieldType;
};

export type PluginInput = PluginInputField[];

export class Plugin {
  config: PluginConfig;

  constructor(config: PluginConfig, dependencies: Dependencies) {
    this.config = config;
    this.dependencies = dependencies;
  }

  private plugin: EPlugin;
  private dependencies: Dependencies;

  async install() {
    this.plugin = await createPlugin(this.config.url, {
      useWasi: true,
      functions: hostFuncAdapter(this.dependencies),
    });

    if (this.config.route) {
      this.dependencies.addRoute(this.config.route, this.config.route);
    }

    this.config.status = PluginStatus.Installed;
  }

  private async getUserInput() {
    if (!this.config.inputs || this.config.inputs.length === 0) {
      return;
    }

    let userInput = "";
    try {
      userInput = await this.dependencies.showForm(this.config.inputs);
    } catch (e) {
      console.error(e);
    }

    return userInput;
  }

  async run(method?: string) {
    this.config.status = PluginStatus.Running;
    let userInput = await this.getUserInput();
    if (!userInput && this.config.inputs && this.config.inputs.length > 0) {
      console.log("userInput is empty");
      this.config.status = PluginStatus.Stopped;
      return;
    }

    const target = method || this.config.name;

    console.log("userInput", userInput);
    let out = await this.plugin.call(target, userInput);
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
    if (this.config.route) {
      this.dependencies.removeRoute(this.config.route);
    }
  }
}