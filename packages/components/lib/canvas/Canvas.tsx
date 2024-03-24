import React, { useEffect } from "react";
import { useRenderer } from "./useRenderer";

export interface AttributeProps {
  name: string;
  size: number;
  data?: any;
}

export interface UniformProps {
  type: string;
  value: Array<number>;
  location?: WebGLUniformLocation;
}

export interface ICanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  fragment: string;
  vertex?: string;
  uniforms?: {
    [key: string]: UniformProps;
  };
  attributes?: Array<AttributeProps>;
  onRender?: (r: any) => void;
  onInstRender?: (r: UniformProps) => void;
  name?: string;
}

export const Canvas = (props: ICanvasProps) => {
  const {
    fragment,
    vertex,
    uniforms = {},
    name,
    attributes = [],
    onRender,
    ...rest
  } = props;

  const { canvasRef, renderer } = useRenderer(uniforms);
  const instName = name ?? "default";

  useEffect(() => {
    if (renderer == null) {
      return;
    }

    // deep copy attributes
    const aCopy = attributes.map((attr) => ({
      ...attr,
      data: (i: number, total: number) => attr.data(i, total),
    }));

    // deep copy uniforms
    const uCopy = Object.keys(uniforms).reduce((acc: any, key) => {
      acc[key] = {
        ...uniforms[key],
        value: [...uniforms[key].value],
      };
      return acc;
    }, {});

    renderer.add(instName, {
      uniforms: {
        ...uCopy,
        uProgress: {
          type: "float",
          value: 0.0,
        },
      },
      attributes: aCopy,
      fragment,
      vertex,
      mode: 4,
      geometry: {
        vertices: [
          { x: -100, y: 100, z: 0 },
          { x: -100, y: -100, z: 0 },
          { x: 100, y: 100, z: 0 },
          { x: 100, y: -100, z: 0 },
          { x: -100, y: -100, z: 0 },
          { x: 100, y: 100, z: 0 },
        ],
      },
      // @ts-ignore
      onRender: (inst: any) => {
        if (inst.uniforms.uProgress != undefined) {
          inst.uniforms.uProgress.value += 0.09;
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
        imageRendering: "pixelated",
      }}
      ref={canvasRef}
      {...rest}
    />
  );
};
