import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { inputVariants } from './Input.variants';
import { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(inputVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
