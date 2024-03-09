import {
  ContextMenuItem,
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@bbki.ng/components";
import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Auth } from "@/components/Auth";
import { Role } from "@/hooks/use_role";
import { confirm } from "@/utils";

export const ImgCtxMenu = (props: { children: ReactElement }) => {
  const param = useParams();
  const imgId = param.id;
  const isImgOfQueen = imgId === "小乌鸦";
  const role = isImgOfQueen ? [Role.QUEEN, Role.KING] : [Role.KING];
  return (
    <ContextMenu>
      <ContextMenuTrigger className="no-touch-callout">
        {props.children}
      </ContextMenuTrigger>
      <Auth role={role}>
        <ContextMenuContent>
          <ContextMenuItem
            onClick={() => {
              confirm("确认删除？", () => {
                console.log("delete");
              });
            }}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </Auth>
    </ContextMenu>
  );
};
