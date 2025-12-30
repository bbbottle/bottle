import React from "react";
import { Button, ButtonType } from "@bbki.ng/components";
import { CommentIcon } from "./comment-icon";
export const CommentBtn = () => {
  return (
    <Button
      size="small"
      className="text-gray-400 hover:text-gray-600 transition-colors ease-in duration-200 px-0"
      type={ButtonType.GHOST}
      onClick={() => {}}
    >
      <CommentIcon />
    </Button>
  );
};
