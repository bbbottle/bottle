// @ts-ignore
import Phenomenon from "phenomenon";
// @ts-ignore
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { createSettings, ISettings } from "./createSettings";
import { createOptions } from "./createOptions";

export interface LoadingSpiralProps extends ISettings {
  className?: string;
}

export const LoadingSpiral = (props?: LoadingSpiralProps) => {
  const { className, step } = props || {};
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const phenomenon = new Phenomenon({
      settings: createSettings({ canvas: canvasRef.current, step }),
      context: {
        antialias: true,
        alpha: true,
      },
    });

    phenomenon.add(
      "spiral",
      createOptions()
    );
  }, []);

  return (
    <canvas
      style={{
        maxWidth: 500,
        maxHeight: 500,
        imageRendering: 'pixelated',
      }}
      ref={canvasRef}
      className={classNames(
        "h-full w-full overflow-hidden flex justify-center items-center aspect-1",
        className
      )}
    />
  );
};
