// @ts-ignore
import classnames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import { RandomRowsLayout, RandomRowsLayoutProps } from "./RandomRowsLayout";
import { ImgProps } from "./types";
import { Img } from "./Img";

export type ImageRenderer = (
  Img: ReactElement,
  index: number,
  col: number,
  randBool: boolean
) => ReactNode;

export interface GalleryProps
  extends Omit<
    RandomRowsLayoutProps,
    "classNames" | "cellsCount" | "cellRenderer"
  > {
  className?: string;
  images: ImgProps[];
  children?: ReactNode;
  imageRenderer?: ImageRenderer;
}

const defaultImageRenderer: ImageRenderer = (img, index, col) => {
  return (
    <div
      className={classnames("mb-256", {
        "md:mr-64": col === 0,
        "md:ml-64": col !== 0,
      })}
    >
      {img}
    </div>
  );
};

export const Gallery = (props: GalleryProps) => {
  const {
    images,
    children,
    imageRenderer = defaultImageRenderer,
    className = "",
    ...rest
  } = props;

  const renderImage = (index: number, isLargeImage: boolean, col: number) => {
    const image: any = images[index];
    if (!image) {
      return null;
    }

    return imageRenderer(
      <Img {...image} size={isLargeImage ? "large" : "normal"} />,
      index,
      col,
      isLargeImage
    );
  };

  return (
    <div className={classnames("w-full flex justify-center", className)}>
      <RandomRowsLayout
        classNames="mx-32 mt-128 max-w-screen-xl"
        cellsCount={images.length}
        cellRenderer={renderImage}
        {...rest}
      />
      {children}
    </div>
  );
};
