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
      <ContextMenuSubTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
          className="feather feather-cpu mr-8"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="4"></line>
          <line x1="15" y1="1" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="23"></line>
          <line x1="15" y1="20" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="23" y2="9"></line>
          <line x1="20" y1="14" x2="23" y2="14"></line>
          <line x1="1" y1="9" x2="4" y2="9"></line>
          <line x1="1" y1="14" x2="4" y2="14"></line>
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
