// @ts-ignore
import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { BlinkDot } from "../blink-dot/BlinkDot";
import { BlurCover } from "../blur-cover/BlurCover";

export type ArticleProps = {
  title: any;
  date?: string;
  className?: string;
  content?: any;
  children: any;
  description?: any;
  loading?: boolean;
};

export const Article: FunctionComponent<ArticleProps> = (props) => {
  const { title, content, children, date, className, description } = props;
  return (
    <div className={classNames("article", className)}>
      <div className="mb-128 leading-none">
        <span className="text-[2.25rem] mb-8 inline-block">{title}</span>
        {props.loading && title && (
          <BlinkDot status="blink" className="-top-[42px]!" />
        )}
        {date ? (
          <div className="px-2 pb-0  text-gray-400">
            <small>{date}</small>
          </div>
        ) : null}
      </div>
      {description && <div className="mb-128">{description}</div>}
      <div className="text-black relative">
        {children || content}
        <BlurCover status={props.loading ? "show" : "silent"} />
        {/*<BlurCover status={"show"} />*/}
      </div>
    </div>
  );
};
