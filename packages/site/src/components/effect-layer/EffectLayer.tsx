import React from "react";
import { Canvas } from "@bbki.ng/components";
import frag from "./shader.frag";
import vert from "./shader.vert";
import cls from "classnames";
import uniforms from "./uniforms";

const canvasDefaultCls = cls(
  "fixed",
  "top-0",
  "left-0",
  "h-full",
  "pointer-events-none",
  "w-full",
  "z-[999]"
);

export const EffectLayer = () => {
  return (
    <Canvas
      className={canvasDefaultCls}
      uniforms={uniforms}
      fragment={frag}
      vertex={vert}
    />
  );
};
