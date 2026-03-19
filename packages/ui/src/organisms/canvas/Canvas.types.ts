import { HTMLAttributes } from 'react';

export interface AttributeProps {
  name: string;
  size: number;
  data?: (index: number, total: number) => number;
}

export interface UniformProps {
  type: string;
  value: number[];
  location?: WebGLUniformLocation;
}

export interface CanvasProps extends HTMLAttributes<HTMLCanvasElement> {
  fragment: string;
  vertex?: string;
  uniforms?: {
    [key: string]: UniformProps;
  };
  attributes?: Array<AttributeProps>;
  onRender?: (r: unknown) => void;
  onInstRender?: (r: UniformProps) => void;
  name?: string;
}
