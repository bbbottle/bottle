import React, { FunctionComponent, ReactElement, ReactNode } from "react";
import classnames from "classnames";
import { Photo } from "@/types/photo";
import { Article, Img } from "@bbki.ng/components";

interface imgListProps {
  className: string;
  imgList: Photo[];
  description?: any;
  beforeListRenderer?: () => ReactNode;
}

const BaseImgList: FunctionComponent<imgListProps> = (props: imgListProps) => {
  const { imgList, className, beforeListRenderer } = props;

  return (
    <div className={classnames("max-h-full no-scrollbar overflow-auto", className)}>
      {beforeListRenderer && <>{beforeListRenderer()}</>}
      {imgList.map((img, index) => {
        const isLast = index === imgList.length - 1;
        return (
          <div key={img.src}>
            <Img {...img} className={classnames({ "mb-256": !isLast })} />
          </div>
        );
      })}
    </div>
  );
};

interface TitledImageListProps extends imgListProps {
  title: string | ReactElement;
}

export const ImgList = (props: TitledImageListProps) => {
  const { title, description, ...rest } = props;

  return (
    <Article title={title} description={description}>
      <BaseImgList {...rest} />
    </Article>
  );
};
