// @ts-ignore
import classNames from "classnames";
import React from "react";

export type BLinkDotProps = {
  className?: string;
};

export const BlinkDot = (props: BLinkDotProps) => {
  const { className } = props;
  return (
    <span
      className={classNames(
        "inline-flex h-1 w-1 justify-center items-center relative",
        className
      )}
    >
      <span className="animate-ping-fast absolute inline-flex h-full w-full rounded-full bg-red-600" />
    </span>
  );
};
