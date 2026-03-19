import { CSSProperties, ReactNode, Ref } from 'react';

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

export interface DropImageProps<T = unknown> {
  uploader: (file: File, img?: HTMLImageElement) => Promise<T>;
  onDrop?: (e: React.DragEvent<Element>, file: File) => void;
  onUploadFinish?: (result: T) => void;
  waitTimeAfterFinish?: number;
  defaultBgColor?: string;
  dragOverBgColor?: string;
  dropAreaStyle?: CSSProperties;
  placeholder?: ReactNode;
  className?: string;
  ghost?: boolean;
  children?: (props: ImagePreviewerProps) => ReactNode;
}
