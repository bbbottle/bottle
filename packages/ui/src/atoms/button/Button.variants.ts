import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button 变体定义
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-sans font-medium',
    'transition-all duration-300 ease-in-out',
    'active:not([disabled]):scale-[0.95]',
  ],
  {
    variants: {
      variant: {
        default: [
          'text-content-primary',
          'bg-transparent',
          'shadow-[var(--shadow-button-hover)]',
          'hover:shadow-[var(--shadow-button)]',
          'active:shadow-[var(--shadow-none)]',
        ],
        primary: [
          'text-content-action',
          'bg-transparent',
          'shadow-[var(--shadow-button-hover)]',
          'hover:shadow-[var(--shadow-button)]',
          'active:shadow-[var(--shadow-none)]',
        ],
        danger: [
          'text-content-danger',
          'bg-transparent',
          'shadow-[var(--shadow-button-hover)]',
          'hover:shadow-[var(--shadow-button)]',
          'active:shadow-[var(--shadow-none)]',
        ],
        ghost: ['text-content-primary', 'bg-transparent', 'shadow-none'],
        disabled: ['text-content-disabled', 'bg-transparent', 'cursor-not-allowed', 'shadow-none'],
      },
      size: {
        sm: 'py-2 px-2',
        md: 'py-2 px-4',
        lg: 'py-2 px-4',
      },
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
