import { ReactElement, ReactNode } from 'react';
import { LinkProps } from '@/atoms/link';

export interface ListProps {
  items: any[];
  itemRenderer: (itemProps: any, index: number) => ReactElement;
  className?: string;
  compact?: boolean;
  horizontal?: boolean;
  footer?: ReactNode;
  spaceBetween?: boolean;
}

export interface TitledListProps extends ListProps {
  title?: ReactNode;
  description?: ReactNode;
}

export interface LinkListProps extends Omit<ListProps, 'itemRenderer' | 'items'> {
  title?: string;
  description?: ReactNode;
  links: LinkProps[];
}
