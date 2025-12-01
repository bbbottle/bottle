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
      <div className="mb-16 leading-none">
        <span className="text-[2.25rem] p-16">{title}</span>
        {props.loading && title && (
          <BlinkDot status="blink" className="!-top-[42px] !-left-16" />
        )}
        {date ? (
          <div className="py-16 px-18 pb-0  text-gray-400">
            <small>{date}</small>
          </div>
        ) : null}
      </div>
      {description && <div className="mb-128">{description}</div>}
      <div className="text-black relative p-16">
        {children || content}
        <BlurCover status={props.loading ? "show" : "silent"} />
        {/*<BlurCover status={"show"} />*/}
      </div>
    </div>
  );
};
