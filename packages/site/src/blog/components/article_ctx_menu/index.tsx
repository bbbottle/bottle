import React, { ReactElement, useCallback } from "react";
import { useAuthed } from "@/hooks/use_authed";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
} from "@bbki.ng/components";
import { useNavigate, useParams } from "react-router-dom";
import { useDelPost } from "@/hooks/use_delete_post";
import { toast } from "sonner";
import { confirm } from "@/utils";
import { useLoadingIndicator } from "@/hooks/useLoadingIndicator";

export const ArticleCtxMenu = (props: { children: ReactElement }) => {
  const auth = useAuthed();
  const del = useDelPost();
  const routeParams = useParams();
  const nav = useNavigate();
  const title = routeParams.title;
  const dot = useLoadingIndicator();

  if (!auth) {
    return props.children;
  }

  if (title == null || title === "") {
    return props.children;
  }

  const doDel = useCallback(() => {
    dot.setVisibility(true);
    del(title)
      .then(() => {
        toast.success("删除成功", {
          position: "bottom-right",
        });
        dot.setVisibility(false);
        nav("/blog");
      })
      .catch(console.log);
  }, [title]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            confirm("确认删除？", doDel);
          }}
        >
          remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
