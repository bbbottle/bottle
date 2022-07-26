import React, { useState } from "react";
import { Button, Img, ImgProps } from "@bbki.ng/components";
import { PHOTOS_FOR_DEMO } from "@/constants/photos";
import { DemoBox } from "@/demo/DemoBox";
import { Photo } from "@/types/photo";

const ImgWrapper = (props: ImgProps) => {
  return (
    <DemoBox>
      <Img {...props} />
    </DemoBox>
  );
};

export const ImgDemo = () => {
  const [count, setCount] = useState(0);
  const refresh = () => {
    setCount(count + 1);
  };

  const images: Photo[] = PHOTOS_FOR_DEMO;
  return (
    <div>
      <ImgWrapper
        {...PHOTOS_FOR_DEMO[count % PHOTOS_FOR_DEMO.length]}
        key={count}
      />
      <Button onClick={refresh} className="mx-32 my-16">
        刷新
      </Button>
    </div>
  );
};
