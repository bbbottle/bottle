// @ts-ignore
import classNames from "classnames";
import React, { FunctionComponent } from "react";

export type ArticleProps = {
  title: any;
  className?: string;
  content?: any;
  children: any;
  description?: any;
};

export const Article: FunctionComponent<ArticleProps> = (props) => {
  const { title, content, children, className, description } = props;
  return (
    <div className={classNames("article", className)}>
      <div className="text-[2.25rem] mb-128 leading-none">{title}</div>
      {description && <div className="mb-128">{description}</div>}
      <div className="text-gray-700">{children || content}</div>
    </div>
  );
};
