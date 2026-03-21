import { ReactNode } from 'react';
import { PathObj } from '../breadcrumb';

export interface NavProps {
  paths: PathObj[];
  loading?: boolean;
  mini?: boolean;
  className?: string;
  customLogo?: ReactNode;
  style?: React.CSSProperties;
}
