import React from "react";
import cls from "classnames";

export type BlurCoverProps = {
  status: "silent" | "show";
  className?: string;
};

export const BlurCover = (props: BlurCoverProps) => {
  const { status } = props;

  const coverCls = cls(
    "fixed",
    "block",
    "text-blur",
    "transition-all",
    "top-0",
    "left-0",
    "h-full",
    "w-full",
    {
      "z-[999]": status === "show",
      "opacity-0": status === "silent",
      "opacity-100": status === "show",
      "pointer-events-none": status === "silent",
    },
    props.className
  );
  return <div className={coverCls} />;
};
