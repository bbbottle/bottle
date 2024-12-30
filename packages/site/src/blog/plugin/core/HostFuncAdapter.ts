import { CurrentPlugin, ExtismPluginOptions } from "@extism/extism";
import { Dependencies } from "@/plugin/core/Dependencies";

type HostFunctions = ExtismPluginOptions["functions"];

export const hostFuncAdapter = (dep: Dependencies): HostFunctions => {
  return {
    "extism:host/user": {
      toast: (cp: CurrentPlugin, offs: bigint) => {
        const content = cp.read(offs).text();
        dep.toast(content);
      },
      loading: (cp: CurrentPlugin, offs: bigint) => {
        const show = cp.read(offs).text() === "true";
        dep.loading(show);
      },
    },
  };
};
