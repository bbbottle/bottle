import {
  ContextMenuItem,
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuLabel,
} from "@bbki.ng/components";
import React, { ReactElement, useContext } from "react";
import { useParams } from "react-router-dom";
import { Auth } from "@/components/Auth";
import { Role } from "@/hooks/use_role";
import { confirm } from "@/utils";
import { ContextMenuSeparator } from "@bbki.ng/components";
import { useDelImg } from "@/hooks/use_del_img";
import { toast } from "sonner";
import { GlobalLoadingContext } from "@/context/global_loading_state_provider";

export const ImgCtxMenu = (props: {
  children: ReactElement;
  name: string;
  date: string;
  width: number;
  height: number;
  id: number;
  onRemoved?: () => Promise<void>;
}) => {
  const param = useParams();
  const delImg = useDelImg();
  const imgId = param.id;
  const isImgOfQueen = imgId === "小乌鸦";
  const role = isImgOfQueen ? [Role.QUEEN, Role.KING] : [Role.KING];
  const date = new Date(props.date).toLocaleString();
  const { setIsLoading } = useContext(GlobalLoadingContext);

  return (
    <ContextMenu>
      <ContextMenuTrigger draggable={false}>
        {props.children}
      </ContextMenuTrigger>
      <Auth role={role}>
        <ContextMenuContent className="w-256">
          <ContextMenuLabel>{props.name}</ContextMenuLabel>
          <ContextMenuItem disabled>
            {props.width} * {props.height}
          </ContextMenuItem>
          <ContextMenuItem disabled>{date}</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={() => {
              confirm("确认删除？", async () => {
                setIsLoading(true);
                await delImg(props.id);
                await props.onRemoved?.();
                toast.success("删除成功", {
                  position: "top-center",
                });
                setIsLoading(false);
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
