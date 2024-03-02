import React from "react";
import { Breadcrumb, PathObj } from "../breadcrumb/Breadcrumb";
import { Logo } from "../logo/Logo";
import { BlinkDot } from "../blink-dot/BlinkDot";
import { useNavigate } from "react-router-dom";

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

  const nav = useNavigate();

  return (
    <div className={`p-8 w-full flex items-center ${props.className}`}>
      <Logo
        className="mr-8"
        onClick={() => {
          nav("/");
        }}
      />
      <Breadcrumb paths={props.paths} loading={props.loading} />
    </div>
  );
};
