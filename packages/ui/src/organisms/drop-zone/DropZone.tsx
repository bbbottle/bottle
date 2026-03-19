import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { DropZoneProps } from './DropZone.types';

export const DropZone = (props: DropZoneProps) => {
  const { onDrop, children, className, style, disabled } = props;
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
    document.addEventListener('dragenter', handleDocDragEnter);

    return () => {
      document.removeEventListener('dragenter', handleDocDragEnter);
    };
  }, [handleDocDragEnter]);

  if (disabled) {
    return <>{children}</>;
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setCoverVisible(true);
  };

  return (
    <>
      <div
        className={twMerge(
          'fixed top-0 left-0 h-full w-full',
          'transition-all duration-200',
          'backdrop-blur-sm bg-background/50',
          coverVisible ? 'z-[999] opacity-100' : 'z-[-1] opacity-0 pointer-events-none',
          className
        )}
        style={style}
        onDragLeave={() => setCoverVisible(false)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      />
      {children}
    </>
  );
};

DropZone.displayName = 'DropZone';
