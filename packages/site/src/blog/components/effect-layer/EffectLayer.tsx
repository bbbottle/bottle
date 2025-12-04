import React from "react";
import { Canvas } from "@bbki.ng/components";
import frag from "./main.frag";
import vert from "./shader.vert";
import cls from "classnames";
import uniforms from "./uniforms";
import { useRender } from "@/components/effect-layer/hooks/useRender";

export const EffectLayer = () => {
  const canvasDefaultCls = cls(
    "fixed",
    "top-0",
    "left-0",
    "h-full",
    "pointer-events-none",
    "w-full",
    "z-999"
  );

  const { onRender } = useRender();

  return (
    <Canvas
      className={canvasDefaultCls}
      uniforms={uniforms}
      fragment={frag}
      vertex={vert}
      onRender={onRender}
    />
  );
};
