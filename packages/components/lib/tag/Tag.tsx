// @ts-ignore
import classNames from "classnames";
import React from "react";
import { Link, LinkColor, LinkProps } from "../link/Link";

export interface TagProps
  extends Pick<LinkProps, "to" | "children" | "className"> {
  name?: string;
}

export const Tag = (props: TagProps) => {
  return (
    <Link {...props} color={LinkColor.GRAY}>
      <small>#{props.children}</small>
    </Link>
  );
};

export const Tags = (props: { tags: TagProps[]; className?: string }) => {
  const { tags, className } = props;
  return (
    <div className={classNames(className, "inline-block")}>
      {tags.map((tag, index) => {
        const isLast = index === tags.length - 1;
        return (
          <Tag
            {...tag}
            key={tag.to}
            className={classNames({ "mr-8": !isLast })}
          />
        );
      })}
    </div>
  );
};
