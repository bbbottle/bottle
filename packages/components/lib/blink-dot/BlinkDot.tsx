// @ts-ignore
import classNames from "classnames";
import React from "react";

export type BLinkDotProps = {
  className?: string;
  status?: "blink" | "still" | "hidden";
};

export const BlinkDot = (props: BLinkDotProps) => {
  const { className } = props;
  const status = props.status || "hidden";

  const statusCls = classNames({
    "animate-ping-fast": status === "blink",
    hidden: status === "hidden",
  });

  return (
    <span
      className={classNames("inline-flex justify-center items-center relative")}
    >
      <span
        className={`absolute inline-flex h-full w-full rounded-full text-red-600  -top-[28px] -left-[3px] ${statusCls}`}
      >
        .
      </span>
    </span>
  );
};
