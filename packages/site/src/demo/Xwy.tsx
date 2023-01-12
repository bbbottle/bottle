import { Img } from "@bbki.ng/components";
import React from "react";

export const Xwy = () => {
  const xwy = {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/illustration/illustration/xwy.jpg",
    renderedWidth: 400,
    width: 1125,
    height: 750,
  };

  return <Img {...xwy} />;
};
