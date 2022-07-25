// @ts-ignore
import cls from "classnames";
import React, {
  FunctionComponent,
  useEffect,
  useCallback,
  Ref,
  ReactNode,
} from "react";
import { useState } from "react";
import { noop, wait } from "./utils";
import { useDropImage } from "./useDropImage";

export interface ImagePreviewerProps {
  className?: string;
  visible: boolean;
  imageRef: Ref<HTMLImageElement>;
  imageSrc: string;
  imageSize: {
    width: number;
    height: number;
  };
}

export interface ImageDropProps<T> {
  uploader: (file: File, img?: HTMLImageElement) => Promise<T>;
  onDrop?: (events: Event, file: File) => void;
  onUploadFinish?: (result: T) => void;
  waitTimeAfterFinish?: number;
  defaultBgColor?: string;
  dragOverBgColor?: string;
  dropAreaStyle?: CSSStyleDeclaration;
  placeholder?: any;
  className?: string;
  ghost?: boolean;
  children?: (props: ImagePreviewerProps) => ReactNode;
}

const ImagePreviewer = (props: ImagePreviewerProps) => {
  const {
    visible: showImagePreviewer,
    imageRef,
    imageSize,
    imageSrc,
    className,
  } = props;
  return (
    <img
      className={cls(
        className,
        "max-w-[100%]",
        "h-[auto]",
        "duration-300",
        "transition-opacity",
        "opacity-100",
        {
          "opacity-0": !showImagePreviewer,
          "!m-0": !showImagePreviewer,
          "!p-0": !showImagePreviewer,
        }
      )}
      ref={imageRef}
      src={imageSrc}
      width={imageSize.width}
      height={imageSize.height}
    />
  );
};

const GhostDropImage: FunctionComponent<ImageDropProps<any>> = (props) => {
  const {
    onDrop = noop,
    onUploadFinish = noop,
    uploader,
    waitTimeAfterFinish = 2000,
    className = "",
    children,
    placeholder,
  } = props;
  const [coverVisible, setCoverVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const handleDocDragEnter = useCallback(() => {
    setCoverVisible(true);
  }, []);

  const {
    handleDragLeave,
    handleDragOver,
    handleDrop,

    imageRef,
    imageSize,
    imageSrc,

    reset,
  } = useDropImage({
    onImageLoad: () => {
      setImageVisible(true);
    },
    onDrop: async (e, file) => {
      onDrop(e, file);
      setCoverVisible(false);
      const result = await uploader(file);
      await wait(waitTimeAfterFinish);
      onUploadFinish(result);
      setImageVisible(false);
      reset();
    },
  });

  useEffect(() => {
    document.addEventListener("dragenter", handleDocDragEnter);

    return () => {
      document.removeEventListener("dragenter", handleDocDragEnter);
    };
  }, []);

  const coverCls = cls("fixed", "top-0", "left-0", "h-full", "w-full", {
    "lqip-blur": coverVisible,
    "z-[999]": coverVisible,
    block: coverVisible,
    hidden: !coverVisible,
  });

  return (
    <>
      <div
        className={coverCls}
        onDragLeave={() => {
          handleDragLeave();
          setCoverVisible(false);
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      {!imageVisible && placeholder}
      {children ? (
        children({
          visible: imageVisible,
          imageRef,
          imageSize,
          imageSrc,
        })
      ) : (
        <ImagePreviewer
          className={className}
          visible={imageVisible}
          imageRef={imageRef}
          imageSrc={imageSrc}
          imageSize={imageSize}
        />
      )}
    </>
  );
};

export const DropImage: FunctionComponent<ImageDropProps<any>> = (props) => {
  const {
    uploader,
    defaultBgColor = "#F3F4F6",
    onDrop,
    dragOverBgColor = "#EFF6FF",
    waitTimeAfterFinish = 2000,
    placeholder = "",
    className = "",
    onUploadFinish = noop,
    ghost,
    children,
    dropAreaStyle = {
      width: 300,
      height: 300,
    },
  } = props;

  if (ghost) {
    return <GhostDropImage {...props} />;
  }

  const [showImagePreviewer, setShowImagePreviewer] = useState(false);
  const {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    imageRef,
    imageSize,
    imageSrc,
    isDragOver,
    reset,
  } = useDropImage({
    onDrop,
    onImageLoad: async (image, file) => {
      await wait(500);
      setShowImagePreviewer(true);
      await onUploadFinish(await uploader(file, image));
      await wait(waitTimeAfterFinish);
      setShowImagePreviewer(false);
      await wait(500);
      reset();
    },
  });

  const getDropAreaStyle = () => {
    return Object.assign({}, dropAreaStyle, {
      background: isDragOver ? dragOverBgColor : defaultBgColor,
      width: imageSize.width || dropAreaStyle.width,
      height: imageSize.height || dropAreaStyle.height,
    });
  };

  return (
    <div
      className={cls(
        className,
        "transition-all items-center justify-center flex duration-200 ease-in-out",
        {
          "shadow-input": !imageSrc,
          "shadow-empty": imageSrc,
        }
      )}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={getDropAreaStyle()}
    >
      {children ? (
        children({
          visible: showImagePreviewer,
          imageRef,
          imageSize,
          imageSrc,
        })
      ) : (
        <ImagePreviewer
          visible={showImagePreviewer}
          imageRef={imageRef}
          imageSrc={imageSrc}
          imageSize={imageSize}
        />
      )}
      {!imageSrc && placeholder}
    </div>
  );
};
