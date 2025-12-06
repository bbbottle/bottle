import React from "react";
import cls from "classnames";

export type BlurCoverProps = {
  status: "silent" | "show";
  className?: string;
  size?: number;
};

export const BlurCover = (props: BlurCoverProps) => {
  const { status } = props;

  const coverCls = cls(
    "absolute",
    "block",
    "text-blur",
    "transition-all",
    "duration-200",
    {
      "z-49": status === "show",
      "opacity-0": status === "silent",
      "opacity-100": status === "show",
      "pointer-events-none": status === "silent",
    },
    props.className,
  );
  return (
    <div
      className={coverCls}
      style={{
        top: -16,
        right: -16,
        left: -16,
        bottom: -16,
        width: "calc(100% + 32px)",
        height: "calc(100% + 32px)",
      }}
    />
  );
};
