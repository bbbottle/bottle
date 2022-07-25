import React from "react";
import { Breadcrumb, PathObj } from "../breadcrumb/Breadcrumb";
import { Logo } from "../logo/Logo";
import { BlinkDot } from "../blink-dot/BlinkDot";

export type NavProps = {
  paths: PathObj[];
  loading?: boolean;
  mini?: boolean;
  className?: string;
};

export const Nav = (props: NavProps) => {
  if (props.mini) {
    return (
      <div className={`p-8 w-full flex items-center ${props.className}`}>
        <Breadcrumb paths={props.paths} />
      </div>
    );
  }

  return (
    <div className={`p-8 w-full flex items-center ${props.className}`}>
      <Logo className="mr-8" />
      <Breadcrumb paths={props.paths} />
      {props.loading && <BlinkDot className="-top-2 left-1" />}
    </div>
  );
};
