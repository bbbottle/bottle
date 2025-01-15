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
import { supabase } from "@/constants";
import { toast } from "sonner";

export const LoginMenuItem = () => {
  const sess = useSupabaseSession();
  const nav = useNavigate();

  if (sess?.user != null) {
    return (
        <ContextMenuItem
          inset
          onClick={() => {
            supabase.auth.signOut().then(() => {
              toast.success("已退出登录", {
                position: "bottom-right",
              });
            });
          }}
        >
          {sess?.user?.user_metadata && (
            <img
              src={sess?.user?.user_metadata.avatar_url}
              alt="avatar"
              style={{ width: 16, height: 16 }}
              className="rounded-full absolute left-2.5"
              crossOrigin="anonymous"
            />
          )}
          {sess?.user?.email ?? ""}
        </ContextMenuItem>
    );
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
