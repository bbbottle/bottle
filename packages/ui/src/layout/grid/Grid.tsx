import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface GridProps {
  children: React.ReactNode;
  className?: string;
  /** 列数 */
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  /** 间距 */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 响应式：移动端列数 */
  mobileCols?: 1 | 2;
  /** 左侧固定内容（三栏布局） */
  leftAside?: React.ReactNode;
  /** 右侧固定内容（三栏布局） */
  rightAside?: React.ReactNode;
}

const gapMap = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const colsMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

/**
 * Grid 布局组件
 *
 * 支持标准网格和三栏布局（参考 MainLayout）。
 */
export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = 3,
  gap = 'md',
  mobileCols = 1,
  leftAside,
  rightAside,
}) => {
  // 三栏布局模式
  if (leftAside || rightAside) {
    return (
      <div
        className={twMerge(
          'grid w-full h-full',
          'grid-cols-1 md:grid-cols-3',
          gapMap[gap],
          className
        )}
      >
        {leftAside && <div className="hidden md:block h-full overflow-auto">{leftAside}</div>}
        <div className="h-full overflow-auto">{children}</div>
        {rightAside && <div className="hidden md:block h-full overflow-auto">{rightAside}</div>}
      </div>
    );
  }

  // 标准网格模式
  const responsiveCols = mobileCols === 2 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <div
      className={twMerge(
        'grid w-full',
        responsiveCols,
        `md:${colsMap[cols]}`,
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';
