import React, { ReactElement, ReactNode } from "react";
import { Article } from "../article/Article";

type PageProps = {
  nav: ReactElement;
  main: ReactElement;
};

export const Page = (props: PageProps) => {
  const { nav, main } = props;
  return (
    <main className="flex flex-col h-full">
      <div className={`flx-grow-0 w-full fixed top-0 z-50`}>{nav}</div>
      <section className="flex-grow flex-shrink-0 px-6">{main}</section>
    </main>
  );
};

export const NotFound = (props: { children?: any }) => {
  return <Error error={{ name: "404", message: "Not Found" }} />;
};

export const Error = (props: { error: Error }) => {
  const { error } = props;
  return (
    <div className="prose">
      <pre>
        <code className="javascript language-javascript">
          {error.name}:{error.message}
        </code>
      </pre>
    </div>
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
            <Error error={this.state.error} />
          </div>
        </Article>
      );
    }

    return this.props.children;
  }
}
