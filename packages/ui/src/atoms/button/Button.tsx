import React, { forwardRef, useState, useCallback } from 'react';
import { buttonVariants } from './Button.variants';
import { ButtonProps } from './Button.types';
import { twMerge } from 'tailwind-merge';

/**
 * Button 组件
 *
 * 设计系统基础原子组件，全部样式来自 CSS 变量。
 * 参考旧 Button 实现，保留点击动画效果。
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      transparent = false,
      loading = false,
      disabled,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // 处理点击事件，添加 280ms 延迟动画（与旧 Button 一致）
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (variant === 'disabled' || disabled || loading) {
          return;
        }

        onClick?.(e);
      },
      [variant, disabled, loading, onClick]
    );

    return (
      <button
        ref={ref}
        className={twMerge(
          buttonVariants({
            variant: disabled || loading ? 'disabled' : variant,
            size,
            transparent: transparent,
          }),
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading && (
          <span
            className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
