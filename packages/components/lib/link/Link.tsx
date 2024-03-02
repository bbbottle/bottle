// @ts-ignore
import classNames from "classnames";
import { Link as BaseLink, LinkProps as BaseLinkProps } from "react-router-dom";
import React from "react";
import { BlinkDot } from "../blink-dot/BlinkDot";

export enum LinkColor {
  BLUE = "blue",
  RED = "red",
  GRAY = "gray",
}

export interface LinkProps extends BaseLinkProps {
  to: string;
  color?: LinkColor;
  className?: string;
  external?: boolean;
  name?: any;
  children?: any;
  readonly?: boolean;
  status?: "blink" | "still" | "hidden";
}

const COLOR_MAPPING = {
  [LinkColor.BLUE]: "text-blue-600",
  [LinkColor.RED]: "text-red-500",
  [LinkColor.GRAY]: "text-gray-400",
};

const HOVER_COLOR_MAPPING = {
  [LinkColor.BLUE]:
    "[&:not(:focus)]:hover:bg-blue-100 [&:not(:focus)]:hover:text-blue-600",
  [LinkColor.RED]:
    "[&:not(:focus)]:hover:bg-red-100 [&:not(:focus)]:hover:text-red-500",
  [LinkColor.GRAY]:
    "[&:not(:focus)]:hover:bg-gray-100 [&:not(:focus)]:hover:text-gray-400",
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
    status,
    readonly,
    ...rest
  } = props;

  const linkCls = classNames(
    className,
    "rounded",
    "!no-underline",
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

  if (readonly) {
    const isNonEnName = !/^[a-zA-Z~]+$/.test(children);
    const offsetCls = classNames({ "relative top-[2px]": isNonEnName });
    return (
      <>
        <span
          className={classNames("text-gray-400", offsetCls)}
          style={{ padding: 4 }}
        >
          {children}
        </span>
        <BlinkDot status={status} />
      </>
    );
  }

  return (
    <>
      <BaseLink {...rest} className={linkCls} style={{ padding: 4 }}>
        {children}
      </BaseLink>
      <BlinkDot className="-top-3 left-1" status={status} />
    </>
  );
};
