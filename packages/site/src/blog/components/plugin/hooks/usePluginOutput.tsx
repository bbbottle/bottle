import { PluginManager } from "@/plugin/PluginManager";
import { useEffect, useState } from "react";

export const usePluginOutput = (pluginId?: number): string => {
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    if (!pluginId) {
      return;
    }
    PluginManager.instance.run(pluginId).then((result) => {
      setOutput(result as string);
    });
  }, [pluginId]);

  return output;
};
