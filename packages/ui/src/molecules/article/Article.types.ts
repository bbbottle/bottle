import { ReactNode } from 'react';

export interface ArticleProps {
  title: ReactNode;
  children?: ReactNode;
  content?: ReactNode;
  date?: string;
  className?: string;
  description?: ReactNode;
  loading?: boolean;
}
