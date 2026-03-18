import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button 变体定义
 * 映射旧 ButtonType 样式，使用 CSS 变量
 */
export const buttonVariants = cva(
  // Base styles - 匹配旧按钮的基础样式
  [
    'inline-flex items-center justify-center',
    'font-sans font-medium',
    'transition-all duration-300 ease-in-out',
    'active:not([disabled]):scale-[0.95]',
  ],
  {
    variants: {
      variant: {
        // 对应旧 ButtonType.NORMAL - 黑色文字，带阴影
        default: [
          'text-[var(--color-gray-900)]',
          'bg-transparent',
          'shadow-[var(--shadow-button-hover)]',
          'hover:shadow-[var(--shadow-button)]',
          'active:shadow-[var(--shadow-none)]',
        ],
        // 对应旧 ButtonType.PRIMARY - 蓝色文字
        primary: [
          'text-[var(--color-blue-600)]',
          'bg-transparent',
          'shadow-[var(--shadow-button-hover)]',
          'hover:shadow-[var(--shadow-button)]',
          'active:shadow-[var(--shadow-none)]',
        ],
        // 对应旧 ButtonType.DANGER - 红色文字
        danger: [
          'text-[var(--color-red-500)]',
          'bg-transparent',
          'shadow-[var(--shadow-button-hover)]',
          'hover:shadow-[var(--shadow-button)]',
          'active:shadow-[var(--shadow-none)]',
        ],
        // 对应旧 ButtonType.GHOST - 透明背景，黑色文字，无阴影
        ghost: ['text-[var(--color-gray-900)]', 'bg-transparent', 'shadow-none'],
        // 对应旧 ButtonType.DISABLED - 灰色文字，无阴影，禁止状态
        disabled: [
          'text-[var(--color-gray-400)]',
          'bg-transparent',
          'cursor-not-allowed',
          'shadow-none',
        ],
      },
      size: {
        sm: 'py-2 px-2', // 对应旧 small: py-8 px-8 (0.5rem)
        md: 'py-2 px-4', // 对应旧 medium: py-8 px-16 (0.5rem 1rem)
        lg: 'py-2 px-4', // 对应旧 large: py-8 px-16 (0.5rem 1rem)
      },
      // 对应旧 transparent 属性
      transparent: {
        true: 'shadow-none pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      transparent: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
