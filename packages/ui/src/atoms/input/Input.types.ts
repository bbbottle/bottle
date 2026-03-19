import { InputVariants } from './Input.variants';

export interface InputProps
  extends Omit<InputVariants, never>, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
}
