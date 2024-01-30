import React from "react";
import { FunctionComponent } from "react";
import { ArticlePage } from "@/components/article";
import { ThreeColLayout, ErrorBoundary } from "@bbki.ng/components";

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
  <T extends object>(Component: any, catchError: boolean = true) =>
  (props: T) => {
    return (
      <ThreeColLayout
        middleRenderer={() => {
          if (!catchError) {
            return <Component {...props} />;
          }
          return (
            <ErrorBoundary>
              <Component {...props} />
            </ErrorBoundary>
          );
        }}
      />
    );
  };
