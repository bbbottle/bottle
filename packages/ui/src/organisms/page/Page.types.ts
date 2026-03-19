import { ReactElement, ReactNode } from 'react';

export interface PageProps {
  nav: ReactElement;
  main: ReactElement;
}

export interface ErrorProps {
  error: Error;
}

export interface NotFoundProps {
  children?: ReactNode;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  error?: Error;
  hasError: boolean;
}
