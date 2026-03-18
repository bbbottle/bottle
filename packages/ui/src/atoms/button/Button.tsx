import { forwardRef } from 'react';
import { buttonVariants } from './Button.variants';
import { ButtonProps } from './Button.types';
import { twMerge } from 'tailwind-merge';

/**
 * Button 组件
 *
 * 设计系统基础原子组件，全部样式来自 CSS 变量。
 * 禁止在组件内硬编码任何数值。
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, loading = false, disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
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
