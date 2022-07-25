import React from "react";
import { PopConfirm } from "./PopConfirm";

export default {
  title: "PopConfirm",
  component: PopConfirm,
};

export const Default = () => (
  <PopConfirm onOk={console.log} onCancel={console.log} className="max-w-xs">
    🚀 点击更新获取最新内容。
  </PopConfirm>
);

export const AsyncHandler = () => (
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
