import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'flex w-full rounded-md border',
    'bg-background',
    'text-foreground',
    'placeholder:text-content-secondary',
    'border-border',
    'transition-all duration-200 ease-in-out',
    'focus-visible:outline-hidden',
    'focus-visible:ring-2',
    'focus-visible:ring-content-action',
    'focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'disabled:text-content-disabled',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type InputVariants = VariantProps<typeof inputVariants>;
