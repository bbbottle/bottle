import React from "react";
import { NoiseGIF } from "./background";

export interface NoiseCoverProps {
  className?: string;
  width?: number;
  height?: number;
  children?: any;
  color?: string;
}

export const NoiseCover = (props: NoiseCoverProps) => {
  const { width, height, children, color, className } = props;
  const noise = (
    <div
      className={className}
      style={{
        backgroundImage: NoiseGIF,
        backgroundSize: 60,
        opacity: "/*!opacity!*/calc(20 / 100)/*!/opacity!*/",
        height: height || "100%",
        width: width || "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999999999,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );

  if (!color) {
    return noise;
  }

  const colorDiv = (
    <div
      style={{
        backgroundColor: color,
        height: height || "100%",
        width: width || "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999999998,
        pointerEvents: "none",
      }}
    />
  );

  return (
    <>
      {colorDiv}
      {noise}
    </>
  );
};
