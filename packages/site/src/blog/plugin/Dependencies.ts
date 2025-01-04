import { PluginInput } from "@/plugin/Plugin";

export interface Dependencies {
  toast: (content: string) => void;
  loading: (show: boolean) => void;
  showForm: (input: PluginInput) => Promise<string>;
  addRoute: (name: string, to: string) => void;
  removeRoute: (name: string) => void;
  callPlugin: (id: number, method: string) => Promise<any>;
}
