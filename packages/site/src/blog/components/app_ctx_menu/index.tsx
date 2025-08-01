import React, { ReactElement, useEffect } from "react";
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
import { PluginManager } from "@/plugin/PluginManager";
import { PluginEvent } from "@/plugin/PluginEvent";
import {PostMenuItem} from "@/components/app_ctx_menu/PostMenuItem";
import {useAuthed} from "@/hooks/use_authed";

export const AppCtxMenu = (props: { children: ReactElement }) => {
  const [showPluginEntry, setShowPluginEntry] = React.useState(false);

  const showEntry = () => {
    setShowPluginEntry(true);
  };

  useEffect(() => {
    PluginManager.addEventListener(PluginEvent.INIT, showEntry);

    return () => {
      PluginManager.removeEventListener(PluginEvent.INIT, showEntry);
    };
  }, []);

  const isKing = useAuthed();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-256">
        <LoginMenuItem />
        <ViewSourceMenuItem />
        {isKing && <PostMenuItem />}
        {/*{showPluginEntry && <PluginsMenuItem />}*/}
      </ContextMenuContent>
    </ContextMenu>
  );
};
