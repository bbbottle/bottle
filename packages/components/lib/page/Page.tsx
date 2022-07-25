import React, { ReactElement, ReactNode } from "react";
import { NoiseCover } from "../noise-cover/NoiseCover";

type PageProps = {
  nav: ReactElement;
  main: ReactElement;
  footer: ReactNode;
};

export const Page = (props: PageProps) => {
  const { nav, main, footer } = props;
  return (
    <main className="flex flex-col h-full">
      <div className={`flx-grow-0 w-full sticky top-0 z-50`}>{nav}</div>
      <section className="flex-grow flex-shrink-0 px-6">{main}</section>
      {footer && (
        <footer className="flex-grow-0 flex-shrink-0 flex items-center justify-center h-64">
          {footer}
        </footer>
      )}
    </main>
  );
};

export const NotFound = (props: { children?: any }) => {
  return (
    <NoiseCover
      color="#2563eb"
      className="flex justify-center items-center text-white"
    >
      {props.children || 404}
    </NoiseCover>
  );
};

export const Error = (props: { error: Error }) => {
  const { error } = props;
  return (
    <NoiseCover
      color="#ef4444"
      className="flex justify-center items-center text-white"
    >
      <code className="p-32">
        {error.name}: {error.message}
      </code>
    </NoiseCover>
  );
};

export class ErrorBoundary extends React.Component<
  { children: any },
  { error?: Error; hasError: boolean }
> {
  constructor(props: { children: any }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.error && this.state.hasError) {
      return <Error error={this.state.error} />;
    }

    return this.props.children;
  }
}
