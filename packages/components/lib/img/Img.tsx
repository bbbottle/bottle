// @ts-ignore
import classnames from "classnames";
import React, { useState } from "react";
import { ImgProps, ossProcessType } from "./types";
import { addOssWebpProcessStyle, calcDefaultImgSize, delay } from "./utils";

const emptyDataURL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export * from "./types";
export const Img = (props: ImgProps) => {
  const {
    src,
    className,
    renderedWidth,
    avgColor,
    thumbnailSrc,
    processType,
    size,
    removeBlurBgAfterLoad,
  } = props;

  const { width, height } = calcDefaultImgSize(
    props,
    renderedWidth,
    size === "normal" ? 0.6 : 1
  );
  const [loaded, setLoaded] = useState(false);
  const [decoded, setDecoded] = useState(false);

  const baseWrapperStyle = {
    width: "initial",
    height: "initial",
    backgroundSize: "cover",
    backgroundColor: avgColor || "#f1f1f1",
    backgroundPosition: "0% 0%",
    backgroundImage: `url(${
      thumbnailSrc
        ? thumbnailSrc
        : addOssWebpProcessStyle(src, ossProcessType.THUMBNAIL)
    })`,
  };

  const dynamicWrapperStyle =
    loaded && removeBlurBgAfterLoad ? { backgroundImage: "none" } : {};

  const handleImgLoad = (img: HTMLImageElement) => {
    const updateFunc = async () => {
      const p = "decode" in img ? img.decode : Promise.resolve;
      try {
        await p();
      } catch (e) {}
      setDecoded(true);
      setLoaded(true);
    };

    if (img.complete) {
      updateFunc().then();
      return;
    }

    img.onload = updateFunc;
  };

  return (
    <span
      className={classnames(
        className,
        "inline-block",
        "relative",
        "overflow-hidden",
        "duration-500",
        "leading-none",
        "align-bottom",
        "border-0"
      )}
      style={Object.assign({}, baseWrapperStyle, dynamicWrapperStyle)}
    >
      <img
        ref={(input) => {
          if (!input) {
            return;
          }

          handleImgLoad(input);
        }}
        width={width}
        height={height}
        src={addOssWebpProcessStyle(src, processType || ossProcessType.WEBP)}
        decoding="async"
        loading="lazy"
        style={{
          contentVisibility: "auto",
        }}
        className={classnames(
          "transition-opacity",
          "opacity-100",
          "duration-500",
          {
            "opacity-0": !decoded,
          }
        )}
      />
      <img
        src={emptyDataURL}
        className={classnames(
          "lqip-blur",
          "absolute",
          "h-full",
          "w-full",
          "duration-500",
          "transition-opacity",
          {
            "opacity-100": !decoded,
            "opacity-0": decoded,
          }
        )}
        style={{ top: 0, left: 0 }}
      />
    </span>
  );
};
