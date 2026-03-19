import { CSSProperties, ReactNode } from 'react';

export interface TableProps {
  rowCount: number;
  rowRenderer: (index: number) => ReactNode;
  headerRenderer?: () => ReactNode;
  className?: string;
}

export interface TableHCellProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export interface TableCellProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}
