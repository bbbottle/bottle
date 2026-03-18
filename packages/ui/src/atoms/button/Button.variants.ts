import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button 变体定义
 * 所有数值来自 CSS 变量，禁止硬编码
 */
export const buttonVariants = cva(
  // Base styles - 使用 Tailwind 类，但颜色引用 CSS 变量
  [
    'inline-flex items-center justify-center',
    'font-sans font-medium',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.97]',
    'rounded-md',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--semantic-color-primary)] text-[var(--semantic-color-primary-foreground)]',
          'shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)]',
        ],
        secondary: [
          'bg-[var(--semantic-color-secondary)] text-[var(--semantic-color-secondary-foreground)]',
          'shadow-[var(--shadow-sm)]',
        ],
        ghost: [
          'bg-transparent hover:bg-[var(--semantic-color-muted)]',
          'text-[var(--semantic-color-foreground)]',
        ],
        destructive: [
          'bg-[var(--semantic-color-destructive)] text-[var(--semantic-color-destructive-foreground)]',
          'shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)]',
        ],
        outline: [
          'bg-transparent border border-[var(--semantic-color-border)]',
          'hover:bg-[var(--semantic-color-muted)]',
          'text-[var(--semantic-color-foreground)]',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
