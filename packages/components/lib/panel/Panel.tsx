import React, { useEffect, useState } from "react";

export type PanelProps = {
  width?: number;
  children: any;
  className?: string;
};

export const Panel = (props: PanelProps) => {
  const { className = "", children } = props;
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`transition-all ease-in-out duration-900 ${className} ${
        show ? "shadow-panel" : "shadow-empty"
      } p-32`}
    >
      {children}
    </div>
  );
};
