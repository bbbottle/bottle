import { useState, useCallback, useRef } from "react";

export const useDropImage = (params?: {
  portraitImageWidth?: number;
  landscapeImageWidth?: number;
  onDrop?: (e: Event, file: File) => void;
  onImageLoad?: (img: HTMLImageElement, file: File) => void;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imageFile = useRef(null);

  const {
    portraitImageWidth = 384,
    landscapeImageWidth = 500,
    onDrop = () => {},
    onImageLoad = () => {},
  } = params || {};

  const reset = () => {
    setImageSrc("");
    setImageSize({ width: 0, height: 0 });
    setIsDragOver(false);
    imageFile.current = null;
  };

  const calcDefaultImgSize = (
    img: { width: number; height: number },
    defaultWidth?: number
  ): { width: number; height: number } => {
    const { width, height } = img;
    const whRatio = width / height;
    const isHorizontal = width > height;

    const finalWidth =
      defaultWidth || (isHorizontal ? landscapeImageWidth : portraitImageWidth);

    return {
      width: finalWidth,
      height: finalWidth / whRatio,
    };
  };

  const setPreviewImageSrcByFile = (file: File) => {
    try {
      setImageSrc(URL.createObjectURL(file));
    } catch (e) {
      setImageSrc("");
    }
  };

  const handleDragOver = useCallback((ev) => {
    ev.preventDefault();
    setIsDragOver(true);
    ev.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((ev) => {
    ev.preventDefault();
    setIsDragOver(false);
    const file = ev.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image")) {
      return;
    }
    imageFile.current = file;
    setPreviewImageSrcByFile(file);
    onDrop(ev, file);
  }, []);

  const handleImgLoad = (img: HTMLImageElement) => {
    const updateFunc = async () => {
      const p = "decode" in img ? img.decode : Promise.resolve;
      try {
        await p();
      } catch (e) {}
      setImageSize(
        calcDefaultImgSize({
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
      );
      if (!imageFile.current) {
        return;
      }
      onImageLoad(img, imageFile.current);
    };

    if (img.complete) {
      updateFunc().then();
      return;
    }

    img.onload = updateFunc;
  };

  const imageRef = useCallback((input) => {
    if (!input) {
      return;
    }

    handleImgLoad(input);
  }, []);

  return {
    isDragOver,

    imageSrc,
    imageRef,
    imageSize,

    handleDragOver,
    handleDragLeave,
    handleDrop,

    reset,
  };
};
