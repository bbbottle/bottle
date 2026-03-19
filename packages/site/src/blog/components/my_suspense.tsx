import React, { ReactElement, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from '@bbki.ng/ui';
import { Spinner } from './Spinner';

export const MySuspense = (props: { children: ReactNode; fallback?: ReactElement }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>{props.children}</Suspense>
    </ErrorBoundary>
  );
};
