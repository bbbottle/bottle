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
import { ViewSourceMenuItem } from "@/components/app_ctx_menu/ViewSourceMenuItem";
import { PostMenuItem } from "@/components/app_ctx_menu/PostMenuItem";
import { useAuthed } from "@/hooks/use_authed";

export const AppCtxMenu = (props: { children: ReactElement }) => {
  const [showPluginEntry, setShowPluginEntry] = React.useState(false);

  const showEntry = () => {
    setShowPluginEntry(true);
  };

  const isKing = useAuthed();

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-5xl">
        <LoginMenuItem />
        <ViewSourceMenuItem />
        {isKing && <PostMenuItem />}
        {/*{showPluginEntry && <PluginsMenuItem />}*/}
      </ContextMenuContent>
    </ContextMenu>
  );
};
