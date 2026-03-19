import { ReactNode } from 'react';
import { PathObj } from '@/molecules/breadcrumb';

export interface NavProps {
  paths: PathObj[];
  loading?: boolean;
  mini?: boolean;
  className?: string;
  customLogo?: ReactNode;
}
