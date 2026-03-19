import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** 最大宽度约束 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** 内边距 */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** 居中对齐 */
  centered?: boolean;
}

const maxWidthMap = {
  sm: 'max-w-[640px]',
  md: 'max-w-[768px]',
  lg: 'max-w-[1024px]',
  xl: 'max-w-[1280px]',
  full: 'max-w-none',
};

const paddingMap = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
};

/**
 * Container 布局组件
 *
 * 提供响应式最大宽度和一致的内边距。
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  maxWidth = 'lg',
  padding = 'md',
  centered = true,
}) => {
  return (
    <div
      className={twMerge(
        'w-full',
        maxWidthMap[maxWidth],
        paddingMap[padding],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

Container.displayName = 'Container';
