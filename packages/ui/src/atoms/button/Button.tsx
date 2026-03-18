import React, { forwardRef, useCallback } from 'react';
import { buttonVariants } from './Button.variants';
import { ButtonProps } from './Button.types';
import { twMerge } from 'tailwind-merge';

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
