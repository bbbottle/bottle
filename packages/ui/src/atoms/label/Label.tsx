import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { twMerge } from 'tailwind-merge';
import { labelVariants } from './Label.variants';
import { LabelProps } from './Label.types';

export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={twMerge(labelVariants(), className)} {...props} />
  )
);

Label.displayName = LabelPrimitive.Root.displayName;
