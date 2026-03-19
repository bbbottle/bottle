import { useCallback, useEffect, useState, FunctionComponent } from 'react';
import { twMerge } from 'tailwind-merge';
import { wait } from './utils';
import { useDropImage } from './useDropImage';
import { ImagePreviewerProps, DropImageProps } from './DropImage.types';

const ImagePreviewer = (props: ImagePreviewerProps) => {
  const { visible: showImagePreviewer, imageRef, imageSize, imageSrc } = props;

  return (
    <img
      className={twMerge(
        'max-w-full h-auto duration-300 transition-opacity opacity-100',
        !showImagePreviewer && 'opacity-0 m-0! p-0!'
      )}
      ref={imageRef}
      src={imageSrc}
      width={imageSize.width}
      height={imageSize.height}
      alt="Preview"
    />
  );
};

ImagePreviewer.displayName = 'ImagePreviewer';

const GhostDropImage: FunctionComponent<DropImageProps<unknown>> = props => {
  const {
    onDrop = () => {},
    onUploadFinish = () => {},
    uploader,
    waitTimeAfterFinish = 2000,
    className = '',
    children,
    placeholder,
  } = props;

  const [coverVisible, setCoverVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const handleDocDragEnter = useCallback(() => {
    setCoverVisible(true);
  }, []);

  const { handleDragLeave, handleDragOver, handleDrop, imageRef, imageSize, imageSrc, reset } =
    useDropImage({
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
    document.addEventListener('dragenter', handleDocDragEnter);

    return () => {
      document.removeEventListener('dragenter', handleDocDragEnter);
    };
  }, [handleDocDragEnter]);

  return (
    <>
      <div
        className={twMerge(
          'fixed top-0 left-0 h-full w-full transition-all duration-200',
          coverVisible
            ? 'backdrop-blur-sm bg-background/50 z-[999] opacity-100'
            : 'z-[-1] opacity-0 pointer-events-none'
        )}
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

GhostDropImage.displayName = 'GhostDropImage';

export const DropImage: FunctionComponent<DropImageProps<unknown>> = props => {
  const {
    uploader,
    defaultBgColor = 'var(--color-muted)',
    onDrop,
    dragOverBgColor = 'var(--color-accent)',
    waitTimeAfterFinish = 2000,
    placeholder = '',
    className = '',
    onUploadFinish = () => {},
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
      className={twMerge(
        'transition-all items-center justify-center flex duration-200 ease-in-out flex-col rounded-sm',
        className,
        imageSrc ? 'shadow-none' : 'shadow-[var(--shadow-input)]'
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

DropImage.displayName = 'DropImage';
