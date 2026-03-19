import { useEffect, useRef, useState } from 'react';
import Phenomenon from 'phenomenon';
import { UniformProps } from './Canvas.types';

type UniformType = {
  [key: string]: UniformProps;
};

export const useRenderer = (uniform: UniformType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderer, setRenderer] = useState<Phenomenon | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const phenomenon = new Phenomenon({
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

    setRenderer(phenomenon);

    return () => {
      phenomenon?.destroy();
      window.removeEventListener('resize', phenomenon?.resize);
    };
  }, []);

  return {
    canvasRef,
    renderer,
  };
};
