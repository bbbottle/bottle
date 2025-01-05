import { CurrentPlugin, ExtismPluginOptions } from "@extism/extism";
import { Dependencies } from "@/plugin/Dependencies";

type HostFunctions = ExtismPluginOptions["functions"];

export const hostFuncAdapter = (dep: Dependencies): HostFunctions => {
  return {
    "extism:host/user": {
      // ui state
      loading: (cp: CurrentPlugin, offs: bigint) => {
        const show = cp.read(offs).text() === "true";
        dep.loading(show);
      },

      // ui io
      toast: (cp: CurrentPlugin, offs: bigint) => {
        const content = cp.read(offs).text();
        dep.toast(content);
      },

      callPlugin: (cp: CurrentPlugin, name: bigint, args: bigint) => {
        const id = cp.read(name).number();
        const method = cp.read(args).text();
        return dep.callPlugin(id, method);
      },
    },
  };
};
