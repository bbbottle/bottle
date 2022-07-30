import React, { useState } from "react";
import { Button, Img, ImgProps } from "@bbki.ng/components";
import { PHOTOS_FOR_DEMO } from "@site/constants/photos";
import { DemoBox } from "@site/src/components/Demos/DemoBox";
import { Photo } from "@site/types/photo";

const ImgWrapper = (props: ImgProps) => {
  return (
    <DemoBox>
      <Img {...props} />
    </DemoBox>
  );
};

export const ImgCompDemo = () => {
  const [count, setCount] = useState(0);
  const refresh = () => {
    setCount(count + 1);
  };

  const images: Photo[] = PHOTOS_FOR_DEMO;

  return (
    <div>
      <ImgWrapper
        {...images[count % images.length]}
        key={count}
      />
      <Button onClick={refresh} className="mx-32 my-16">
        刷新
      </Button>
    </div>
  );
};
