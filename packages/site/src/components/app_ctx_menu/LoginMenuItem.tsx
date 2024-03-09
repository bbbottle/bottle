import { useAuthed } from "@/hooks/use_authed";
import { useSupabaseSession } from "@/hooks/use_supa_session";
import {
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuShortcut,
  Link,
} from "@bbki.ng/components";
import React from "react";
import { useNavigate } from "react-router-dom";

export const LoginMenuItem = () => {
  const isKing = useAuthed();
  const sess = useSupabaseSession();
  const nav = useNavigate();

  if (isKing) {
    return <ContextMenuLabel inset>{sess?.user?.email ?? ""}</ContextMenuLabel>;
  }

  return (
    <ContextMenuItem
      onClick={() => {
        nav("/login");
      }}
      inset
    >
      login
      <ContextMenuShortcut>l</ContextMenuShortcut>
    </ContextMenuItem>
  );
};
