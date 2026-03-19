import { CSSProperties, ReactNode } from 'react';

export interface DropZoneProps {
  onDrop: (file: File) => void;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  disabled?: boolean;
}
