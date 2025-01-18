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
import { confirm } from "@/utils";

export const LoginMenuItem = () => {
  const sess = useSupabaseSession();
  const nav = useNavigate();

  if (sess?.user != null) {
    return (
      <ContextMenuItem
        inset
        onClick={() => {
          confirm("确定退出登录吗？", () => {
            supabase.auth.signOut().then(() => {
              toast.success("已退出登录", {
                position: "bottom-right",
              });
            });
          });
        }}
      >
        {sess?.user?.user_metadata && (
          <img
            src={sess?.user?.user_metadata.avatar_url}
            alt="avatar"
            style={{ width: 16, height: 16 }}
            className="rounded-full mr-8"
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
    >
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
        className="feather feather-log-in mr-8"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
      login
      <ContextMenuShortcut className="mr-1">l</ContextMenuShortcut>
    </ContextMenuItem>
  );
};
