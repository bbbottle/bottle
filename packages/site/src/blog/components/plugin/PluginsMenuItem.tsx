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
      <ContextMenuSubTrigger inset>Plugins</ContextMenuSubTrigger>
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
              await PluginManager.instance.run<string, string>(
                plugin.id,
                "hello"
              );
              setPlugins(PluginManager.instance.listAvailable());
            }}
            onStop={(plugin: PluginConfig) => {}}
          />
        ))}
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};
