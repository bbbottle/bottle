import React from "react";
import { FunctionComponent } from "react";
import { ArticlePage } from "@/components/article";
import { ThreeColLayout, ErrorBoundary, Link } from "@bbki.ng/components";

export const withArticleWrapper =
  (Component: FunctionComponent<any>): FunctionComponent<any> =>
  (props: any) => {
    return (
      <>
        <ArticlePage {...props}>
          <Component />
        </ArticlePage>
      </>
    );
  };

export const threeColWrapper =
  <T extends object>(Component: any) =>
  (props: T) => {
    return (
      <ThreeColLayout
        middleRenderer={() => (
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        )}
      />
    );
  };
