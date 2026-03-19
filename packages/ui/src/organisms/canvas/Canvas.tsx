import { useEffect } from 'react';
import { useRenderer } from './useRenderer';
import { CanvasProps, UniformProps } from './Canvas.types';

export const Canvas = (props: CanvasProps) => {
  const { fragment, vertex, uniforms = {}, name, attributes = [], onRender, ...rest } = props;

  const { canvasRef, renderer } = useRenderer(uniforms);
  const instName = name ?? 'default';

  useEffect(() => {
    if (renderer == null || canvasRef.current == null) {
      return;
    }

    const aCopy = attributes.map(attr => ({
      ...attr,
      data: (i: number, total: number) => attr.data?.(i, total),
    }));

    const uCopy = Object.keys(uniforms).reduce((acc: Record<string, UniformProps>, key) => {
      acc[key] = {
        ...uniforms[key],
        value: [...uniforms[key].value],
      };
      return acc;
    }, {});

    const vertices: Array<{ x: number; y: number; z: number }> = [
      { x: -100, y: 100, z: 0 },
      { x: -100, y: -100, z: 0 },
      { x: 100, y: 100, z: 0 },
      { x: 100, y: -100, z: 0 },
      { x: -100, y: -100, z: 0 },
      { x: 100, y: 100, z: 0 },
    ];

    (renderer.add as (name: string, props: unknown) => void)(instName, {
      uniforms: {
        ...uCopy,
        uProgress: {
          type: 'float',
          value: [0.0],
        },
      },
      attributes: aCopy,
      fragment,
      vertex,
      mode: 4,
      geometry: { vertices: vertices as unknown as object[][] },
      onRender: (inst: { uniforms: { uProgress?: { value: number[] } } }) => {
        if (inst.uniforms.uProgress != undefined) {
          inst.uniforms.uProgress.value[0] += 0.09;
        }

        if (onRender) {
          onRender(inst);
        }
      },
    });

    return () => {
      renderer.remove(instName);
    };
  }, [renderer]);

  return (
    <canvas
      style={{
        ...props.style,
        imageRendering: 'pixelated',
      }}
      ref={canvasRef}
      {...rest}
    />
  );
};

Canvas.displayName = 'Canvas';
