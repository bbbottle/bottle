import React, { ReactElement, ReactNode } from "react";
import { NoiseCover } from "../noise-cover/NoiseCover";
import { Article } from "../article/Article";

type PageProps = {
  nav: ReactElement;
  main: ReactElement;
};

export const Page = (props: PageProps) => {
  const { nav, main } = props;
  return (
    <main className="flex flex-col h-full">
      <section className="flex-grow flex-shrink-0 px-6">{main}</section>
      <div className={`flx-grow-0 w-full sticky bottom-0 z-50`}>{nav}</div>
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
      return (
        <Article title="出错">
          <div className="relative h-256">
            <Error error={this.state.error} />;
          </div>
        </Article>
      );
    }

    return this.props.children;
  }
}
