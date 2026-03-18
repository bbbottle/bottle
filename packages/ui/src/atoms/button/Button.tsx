import React, { forwardRef, useCallback } from 'react';
import { buttonVariants } from './Button.variants';
import { ButtonProps } from './Button.types';
import { twMerge } from 'tailwind-merge';
import { BlinkDot } from '../blink-dot';

/**
 * Button 组件
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
        {children}
        {loading && <BlinkDot status="blink" xOffset={2} />}
      </button>
    );
  }
);

Button.displayName = 'Button';
