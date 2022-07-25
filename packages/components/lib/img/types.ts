export enum ossProcessType {
  THUMBNAIL = "thumbnail",
  WEBP = "webp",
  NULL = "null",
  oWEBP = "owebp",
  PROG = "prog",
}

export interface Photo {
  src: string;
  width: number;
  height: number;
  processType?: ossProcessType;
  avgColor?: string;
  thumbnailSrc?: string;
  renderedWidth?: number;
}

export interface ImgProps extends Photo {
  className?: string;
  size?: "large" | "normal";
  removeBlurBgAfterLoad?: boolean;
}
