import React from "react";
import { Img } from "./Img";

export default {
  title: "Img",
  component: Img,
};

const img = {
  src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/x2705749244.jpg",
  renderedWidth: 500,
  width: 1080,
  height: 830,
};

export const Default = () => {
  return <Img {...img} />;
};
