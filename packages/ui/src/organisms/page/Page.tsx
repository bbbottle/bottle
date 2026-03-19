import React, { ReactElement } from 'react';
import { Article } from '../../molecules/article';
import {
  PageProps,
  ErrorProps,
  NotFoundProps,
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from './Page.types';

export const Page = (props: PageProps) => {
  const { nav, main } = props;

  return (
    <main className="flex flex-col h-full">
      <div className="flex-grow-0 w-full fixed top-0 z-50">{nav}</div>
      <section className="grow shrink-0 px-6 pt-16">{main}</section>
    </main>
  );
};

Page.displayName = 'Page';

export const NotFound = (props: NotFoundProps) => {
  const { children } = props;
  return <Error error={{ name: '404', message: children || 'Not Found' } as Error} />;
};

NotFound.displayName = 'NotFound';

export const Error = (props: ErrorProps) => {
  const { error } = props;

  return (
    <div className="prose">
      <pre>
        <code className="language-javascript text-content-danger">
          {error.name}: {error.message}
        </code>
      </pre>
    </div>
  );
};

Error.displayName = 'Error';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render(): ReactElement | null {
    if (this.state.error && this.state.hasError) {
      return (
        <Article title="出错">
          <div className="relative h-64">
            <Error error={this.state.error} />
          </div>
        </Article>
      );
    }

    return this.props.children as ReactElement;
  }
}
