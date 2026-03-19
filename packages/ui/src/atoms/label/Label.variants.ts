import { cva, type VariantProps } from 'class-variance-authority';

export const labelVariants = cva(
  'text-sm font-medium leading-none text-content-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

export type LabelVariants = VariantProps<typeof labelVariants>;
