import React from "react";
import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@bbki.ng/components";
import { PluginConfig, PluginStatus } from "@/plugin/Plugin";

type PluginMenuItemProps = {
  plugin: PluginConfig;
  onUninstall: (plugin: PluginConfig) => void;
  onInstall: (plugin: PluginConfig) => void;
  onStop: (plugin: PluginConfig) => void;
  onRun: (plugin: PluginConfig) => void;
};

export const PluginMenuItem = (props: PluginMenuItemProps) => {
  const { plugin, onUninstall, onStop, onRun, onInstall } = props;
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger inset>
        {plugin.name} v{plugin.version}
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        {plugin.status !== PluginStatus.Available && (
          <ContextMenuItem
            onClick={() => {
              onUninstall(plugin);
            }}
          >
            uninstall
          </ContextMenuItem>
        )}
        {plugin.status === PluginStatus.Available && (
          <ContextMenuItem
            onClick={() => {
              onInstall(plugin);
            }}
          >
            install
          </ContextMenuItem>
        )}
        {plugin.status === PluginStatus.Running && (
          <ContextMenuItem
            onClick={() => {
              onStop(plugin);
            }}
          >
            stop
          </ContextMenuItem>
        )}
        {(plugin.status === PluginStatus.Installed ||
          plugin.status === PluginStatus.Stopped) &&
          !plugin.route && (
            <ContextMenuItem
              onClick={() => {
                onRun(plugin);
              }}
            >
              run
            </ContextMenuItem>
          )}
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};
