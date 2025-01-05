import React, { ReactElement } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuItem,
} from "@bbki.ng/components";
import { LoginMenuItem } from "@/components/app_ctx_menu/LoginMenuItem";
import { VersionMenuItem } from "@/components/app_ctx_menu/VersionMenuItem";
import { ViewSourceMenuItem } from "@/components/app_ctx_menu/ViewSourceMenuItem";
import { PluginsMenuItem } from "@/components/plugin/PluginsMenuItem";

export const AppCtxMenu = (props: { children: ReactElement }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-256">
        <LoginMenuItem />
        <VersionMenuItem />
        <ViewSourceMenuItem />
        <ContextMenuSeparator />
        <PluginsMenuItem />
      </ContextMenuContent>
    </ContextMenu>
  );
};
