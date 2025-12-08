import React, { useCallback, useEffect, useState } from "react";
import cls from "classnames";

export interface DropZoneProps {
  onDrop: (files: File) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const DropZone = (props: DropZoneProps) => {
  const { onDrop, children, className, style } = props;

  const [coverVisible, setCoverVisible] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setCoverVisible(false);
    const file = e.dataTransfer.files[0];
    onDrop(file);
  };

  const handleDocDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    setCoverVisible(true);
  }, []);

  useEffect(() => {
    document.addEventListener("dragenter", handleDocDragEnter);

    return () => {
      document.removeEventListener("dragenter", handleDocDragEnter);
    };
  }, []);

  if (props.disabled) {
    return <>{children}</>;
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setCoverVisible(true);
  };

  const coverCls = cls("fixed", "top-0", "left-0", "h-full", "w-full", {
    "text-blur": coverVisible,
    "z-999": coverVisible,
    block: coverVisible,
    hidden: !coverVisible,
  });

  return (
    <>
      <div
        className={coverCls}
        onDragLeave={() => {
          setCoverVisible(false);
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      {children}
    </>
  );
};
