import React, { useEffect } from "react";
import cls from "classnames";

export type DelayFadeInProps = {
  children: any;
  delay: number;
};

export const DelayFadeIn = (props: DelayFadeInProps) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setShow(true);
    }, props.delay);

    return () => {
      clearTimeout(id);
    };
  }, []);

  const className = cls("transition-opacity", {
    "opacity-100": show,
    "opacity-0": !show,
  });

  return <div className={className}>{props.children}</div>;
};
