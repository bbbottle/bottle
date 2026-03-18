import React from 'react';
import { twMerge } from 'tailwind-merge';

export type BlinkDotStatus = 'blink' | 'still' | 'hidden';

export interface BlinkDotProps {
  className?: string;
  status?: BlinkDotStatus;
}

/**
 * BlinkDot 组件
 *
 * 用于展示状态指示器的闪烁点。
 */
export const BlinkDot: React.FC<BlinkDotProps> = ({ className, status = 'hidden' }) => {
  return (
    <span className="inline-flex justify-center items-center relative">
      <span
        className={twMerge(
          'absolute inline-flex h-full w-full rounded-full',
          'text-[var(--color-red-600)]',
          '-top-[28px] -left-[3px]',
          status === 'blink' && 'animate-ping-fast',
          status === 'hidden' && 'hidden',
          className
        )}
      >
        .
      </span>
    </span>
  );
};

BlinkDot.displayName = 'BlinkDot';
