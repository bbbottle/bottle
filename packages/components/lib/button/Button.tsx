import React from "react";
import { EventHandler } from "react";

export enum ButtonType {
  DANGER = "danger",
  PRIMARY = "primary",
  NORMAL = "normal",
  DISABLED = "disabled",
}

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  type?: ButtonType;
  onClick: EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

export function Button(props: ButtonProps) {
  const typeClsMap = {
    [ButtonType.DANGER]: "text-red-500",
    [ButtonType.PRIMARY]: "text-blue-600",
    [ButtonType.DISABLED]: "text-gray-400 cursor-not-allowed",
    [ButtonType.NORMAL]: "text-black",
  };

  const { type = ButtonType.NORMAL, className = "", onClick } = props;
  const shadowTransCls =
    type === ButtonType.DISABLED
      ? ""
      : "transition-all duration-200 ease-in-out shadow-button hover:shadow-button-hover active:shadow-empty";
  return (
    <button
      className={`${typeClsMap[type]} ${className} ${shadowTransCls} py-8 px-16 transition-all duration-200 ease-in-out`}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}

Button.displayName = "Button";
