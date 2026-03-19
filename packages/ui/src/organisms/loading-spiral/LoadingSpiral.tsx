import { useEffect, useRef } from 'react';
import Phenomenon from 'phenomenon';
import { twMerge } from 'tailwind-merge';
import { createSettings } from './createSettings';
import { createOptions } from './createOptions';
import { LoadingSpiralProps } from './LoadingSpiral.types';

export const LoadingSpiral = (props?: LoadingSpiralProps) => {
  const { className, step } = props || {};
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    phenomenon.add('spiral', createOptions());
  }, [step]);

  return (
    <canvas
      style={{
        maxWidth: 500,
        maxHeight: 500,
        imageRendering: 'pixelated',
      }}
      ref={canvasRef}
      className={twMerge(
        'h-full w-full overflow-hidden flex justify-center items-center aspect-square',
        className
      )}
    />
  );
};

LoadingSpiral.displayName = 'LoadingSpiral';
