import React from 'react';
import { twMerge } from 'tailwind-merge';

export type BlinkDotStatus = 'blink' | 'still' | 'hidden';

export interface BlinkDotProps {
  className?: string;
  status?: BlinkDotStatus;
  xOffset?: number; // 水平偏移，单位像素
  yOffset?: number; // 垂直偏移，单位像素
}

/**
 * BlinkDot 组件
 *
 * 用于展示状态指示器的闪烁点。
 */
export const BlinkDot: React.FC<BlinkDotProps> = ({
  className,
  status = 'hidden',
  xOffset = 0,
  yOffset = -28,
}) => {
  return (
    <span className="inline-flex justify-center items-center relative">
      <span
        className={twMerge(
          'absolute inline-flex h-full w-full rounded-full',
          'text-status-error',
          status === 'blink' && 'animate-ping-fast',
          status === 'hidden' && 'hidden',
          className
        )}
        style={{
          left: `${xOffset}px`,
          top: `${yOffset}px`,
        }}
      >
        .
      </span>
    </span>
  );
};

BlinkDot.displayName = 'BlinkDot';
