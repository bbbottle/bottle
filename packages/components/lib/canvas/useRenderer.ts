import { UniformProps } from "./Canvas";
import { useEffect, useRef, useState } from "react";
import Phenomenon from "phenomenon";

type uniformType = {
  [key: string]: UniformProps;
};

export const useRenderer = (uniform: uniformType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderer, setRenderer] = useState<Phenomenon | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const renderer = new Phenomenon({
      settings: {
        uniforms: uniform,
        devicePixelRatio: window.devicePixelRatio,
        shouldRender: true,
        canvas: canvasRef.current,
        mode: 4,
      },
      context: {
        antialias: true,
        alpha: true,
      },
    });

    setRenderer(renderer);

    return () => {
      renderer?.destroy();
      window.removeEventListener("resize", renderer?.resize);
    };
  }, [canvasRef.current]);

  return {
    canvasRef,
    renderer,
  };
};
