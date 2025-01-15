import React from "react";
import {
  ContextMenuSeparator,
  ContextMenuItem,
  ContextMenuSubContent,
  ContextMenuSub,
  ContextMenuSubTrigger,
} from "@bbki.ng/components";
import { Plugin, PluginConfig } from "@/plugin/Plugin";
import { PluginManager } from "@/plugin/PluginManager";
import { PluginMenuItem } from "@/components/plugin/PluginMenuItem";

export const PluginsMenuItem = () => {
  const [plugins, setPlugins] = React.useState<PluginConfig[]>([]);

  React.useEffect(() => {
    setPlugins(PluginManager.instance.listAvailable());
  }, []);
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger inset>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-plug rotate-90 absolute left-2.5"
      >
        <path d="M12 22v-5"></path>
        <path d="M9 8V2"></path>
        <path d="M15 8V2"></path>
        <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path>
      </svg>
        Plugins
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        {plugins.map((plugin) => (
          <PluginMenuItem
            key={plugin.id}
            plugin={plugin}
            onInstall={async (plugin: PluginConfig) => {
              await PluginManager.instance.install(plugin.id);
              setPlugins(PluginManager.instance.listAvailable());
            }}
            onUninstall={async (plugin: PluginConfig) => {
              await PluginManager.instance.uninstall(plugin);
              setPlugins(PluginManager.instance.listAvailable());
            }}
            onRun={async (plugin: PluginConfig) => {
              await PluginManager.instance.run(plugin.id);
              setPlugins(PluginManager.instance.listAvailable());
            }}
            onStop={(plugin: PluginConfig) => {}}
          />
        ))}
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};
