import React from "react";
import { EventHandler } from "react";
import classNames from "classnames";

export enum ButtonType {
  DANGER = "danger",
  PRIMARY = "primary",
  NORMAL = "normal",
  DISABLED = "disabled",
  GHOST = "ghost",
}

export interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  type?: ButtonType;
  onClick: EventHandler<React.MouseEvent<HTMLButtonElement>>;
  btnType?: "submit" | "reset" | "button";
}

export function Button(props: ButtonProps) {
  const typeClsMap: Record<ButtonType, string> = {
    [ButtonType.DANGER]: "text-red-500",
    [ButtonType.PRIMARY]: "text-blue-600",
    [ButtonType.DISABLED]: "text-gray-400 cursor-not-allowed",
    [ButtonType.NORMAL]: "text-black",
    [ButtonType.GHOST]: "text-black bg-transparent",
  };

  const [pressed, setPressed] = React.useState(false);

  const { type = ButtonType.NORMAL, className = "", onClick, btnType } = props;
  const shadowTransCls =
    type === ButtonType.DISABLED || type === ButtonType.GHOST
      ? ""
      : classNames(
          "transition-all duration-200 ease-in-out shadow-button active:shadow-empty",
          {
            "shadow-empty": pressed,
            "hover:shadow-button-hover": !pressed,
          },
        );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === ButtonType.DISABLED) {
      return;
    }

    setPressed(true);

    setTimeout(() => {
      setPressed(false);
      onClick(e);
    }, 280);
  };

  return (
    <button
      className={`${typeClsMap[type]} ${className} ${shadowTransCls} py-8 px-16 transition-all duration-200 ease-in-out`}
      onClick={handleClick}
      type={btnType}
    >
      {props.children}
    </button>
  );
}

Button.displayName = "Button";
