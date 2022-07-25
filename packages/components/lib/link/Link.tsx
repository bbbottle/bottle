// @ts-ignore
import classNames from "classnames";
import { Link as BaseLink, LinkProps as BaseLinkProps } from "react-router-dom";
import React from "react";

export enum LinkColor {
  BLUE = "blue",
  RED = "red",
  GRAY = "gray",
}

export interface LinkProps extends BaseLinkProps {
  color?: LinkColor;
  className?: string;
  external?: boolean;
  name?: any;
  children?: any;
  to: string;
}

const COLOR_MAPPING = {
  [LinkColor.BLUE]: "text-blue-600",
  [LinkColor.RED]: "text-red-500",
  [LinkColor.GRAY]: "text-gray-400",
};

const HOVER_COLOR_MAPPING = {
  [LinkColor.BLUE]: "hover:bg-blue-100",
  [LinkColor.RED]: "hover:bg-red-100",
  [LinkColor.GRAY]: "hover:bg-gray-100",
};

const FOCUS_BG_COLOR_MAPPING = {
  [LinkColor.BLUE]: "focus:bg-blue-600",
  [LinkColor.RED]: "focus:bg-red-500",
  [LinkColor.GRAY]: "focus:bg-gray-400",
};

export const Link = (props: LinkProps) => {
  const {
    color = LinkColor.BLUE,
    external,
    className,
    children,
    ...rest
  } = props;

  const linkCls = classNames(
    className,
    "rounded",
    "no-underline",
    "transition-colors",
    "focus:text-white",
    COLOR_MAPPING[color],
    HOVER_COLOR_MAPPING[color],
    FOCUS_BG_COLOR_MAPPING[color]
  );

  if (external) {
    return (
      <a href={props.to} className={linkCls} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <BaseLink {...rest} className={linkCls}>
      {children}
    </BaseLink>
  );
};
