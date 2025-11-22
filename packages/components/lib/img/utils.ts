import { ossProcessType, Photo } from "./types";

export const addOssWebpProcessStyle = (
  originUrl: string,
  style: ossProcessType
): string => {
  const OSS_ADDRESS = "https://zjh-im-res.oss-cn-shenzhen.aliyuncs.com";
  const isInvalidOSSImgUrl = !originUrl.startsWith(OSS_ADDRESS);
  const isProcessedOssImg = /x-oss-process=style\/\w+/.test(originUrl);
  const isWebpImg = /webp$/.test(originUrl);

  if (
    isInvalidOSSImgUrl ||
    isProcessedOssImg ||
    (isWebpImg && style === ossProcessType.WEBP) ||
    style === ossProcessType.NULL
  ) {
    return originUrl;
  }
  return `${originUrl}?x-oss-process=style/${style}`;
};

export const calcDefaultImgSize = (
  img: Photo,
  defaultWidth?: number,
  scale?: number
): { width: number; height: number } => {
  const { width, height } = img;
  const whRatio = width / height;
  const isHorizontal = width > height;

  const finalWidth =
    (defaultWidth || (isHorizontal ? 576 : 384)) * (scale || 1);

  return {
    width: finalWidth,
    height: finalWidth / whRatio,
  };
};

export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
