import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Link 变体定义
 * 使用语义化颜色 token，支持 light/dark 主题切换
 */
export const linkVariants = cva(
  [
    'inline-block',
    'rounded-sm',
    'no-underline!',
    'transition-all duration-500 ease-in-out',
    'active:scale-[0.97]',
    'bg-transparent',
    'p-2',
  ],
  {
    variants: {
      variant: {
        default: [
          // 默认链接样式 - 使用 action 颜色（蓝色系）
          'text-content-action',
          'md:not-focus:hover:bg-secondary',
          'md:not-focus:hover:text-content-action',
          'focus:bg-secondary',
        ],
        danger: [
          // 危险/强调样式 - 使用 danger 颜色（粉色/红色系）
          'text-content-danger',
          'md:not-focus:hover:bg-accent/50',
          'md:not-focus:hover:text-content-danger',
          'focus:bg-accent/50',
        ],
        special: [
          // use special color
          'text-content-special',
          'md:not-focus:hover:bg-special',
          'md:not-focus:hover:text-content-special',
          'focus:bg-special',
        ],
        muted: [
          // 弱化样式 - 使用 secondary 颜色（灰色系）
          'text-content-secondary',
          'md:not-focus:hover:bg-muted',
          'md:not-focus:hover:text-content-secondary',
          'focus:bg-muted',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type LinkVariants = VariantProps<typeof linkVariants>;
