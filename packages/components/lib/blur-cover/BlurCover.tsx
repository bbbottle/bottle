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
    "top-0",
    "left-0",
    "h-full",
    "w-full",
    {
      "z-[49]": status === "show",
      "opacity-0": status === "silent",
      "opacity-100": status === "show",
      "pointer-events-none": status === "silent",
    },
    props.className
  );
  return <div className={coverCls} />;
};
