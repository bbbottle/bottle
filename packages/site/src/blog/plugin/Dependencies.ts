import { PluginInput } from "@/plugin/Plugin";

export interface Dependencies {
  toast: (content: string) => void;
  loading: (show: boolean) => void;
  showForm: (input: PluginInput) => Promise<string>;
}
