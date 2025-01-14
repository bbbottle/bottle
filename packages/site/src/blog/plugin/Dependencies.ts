import { PluginInput } from "@/plugin/Plugin";
import { PluginConfig  } from "@/plugin/Plugin";

export interface Dependencies {
  toast: (content: string) => void;
  loading: (show: boolean) => void;
  showForm: (input: PluginInput) => Promise<string>;
  showUI: (html: string) => void;

  addRoute: (name: string, to: string) => void;
  removeRoute: (name: string) => void;
  callPlugin: (id: number, method: string) => Promise<any>;
  fetchPlugins: () => Promise<PluginConfig[]>;
}
