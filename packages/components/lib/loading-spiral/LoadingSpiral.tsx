// @ts-ignore
import Phenomenon from "phenomenon";
// @ts-ignore
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { createSettings, ISettings } from "./createSettings";
import { createOptions, DEFAULT_OPT, IOpt } from "./createOptions";
import { useResizedCanvasRef } from "./useCanvasRef";

export interface LoadingSpiralProps extends IOpt, ISettings {
  className?: string;
  maxWidth?: number;
  offset?: number;
}

export const LoadingSpiral = (props?: LoadingSpiralProps) => {
  const { className, canvas, step, maxWidth = 1000, ...rest } = props || {};
  const { canvasRef, containerRef } = useResizedCanvasRef(maxWidth);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const phenomenon = new Phenomenon({
      settings: createSettings({ canvas: canvasRef.current, step }),
      context: {
        antialias: true,
      },
    });

    phenomenon.add(
      "spiral",
      createOptions(Object.assign({}, DEFAULT_OPT, rest))
    );
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={classNames(
        "h-full w-full overflow-hidden flex justify-center items-center",
        className
      )}
    />
  );
};
