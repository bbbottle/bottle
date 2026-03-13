import React, { ReactElement } from 'react';
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from '@bbki.ng/components';
import { LoginMenuItem } from '@/components/app_ctx_menu/LoginMenuItem';
import { ViewSourceMenuItem } from '@/components/app_ctx_menu/ViewSourceMenuItem';

export const AppCtxMenu = (props: { children: ReactElement }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="">
        <LoginMenuItem />
        <ViewSourceMenuItem />
      </ContextMenuContent>
    </ContextMenu>
  );
};
