import React from 'react';
import { Img } from '@bbki.ng/components';

export const ImgDemo = () => {

  const img = {
    src: "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com/image/xiang-jiang-river/x2705749244.jpg",
    renderedWidth: 500,
    width: 1080,
    height: 830,
  };
  return (
    <div style={{ maxWidth: 500 }}>
      <Img {...img} />
    </div>
  )
}
