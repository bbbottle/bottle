import React from "react";
import { PopConfirm } from "@bbki.ng/components";

export const PopConfirmDemo = () => (
  <PopConfirm
    onOk={() => {
      return new Promise((r) => setTimeout(r, 3000));
    }}
    onCancel={console.log}
    className="max-w-xs"
  >
    🚀 点击更新获取最新内容。
  </PopConfirm>
);
