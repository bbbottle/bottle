import { ATTR, VERTEX_SHADER, FRAGMENT_SHADER } from "./constants";

export interface IOpt {
  multiplier: number;
  color: number[];
  offset?: number;
  length: number;
}

export const DEFAULT_OPT: IOpt = {
  multiplier: 5000,
  color: [209, 213, 219, 1],
  offset: -0.3,
  length: 0.3,
};

export const createOptions = () => {
  const attributes = [
    {
      name: ATTR.PERCENT,
      data: (i: number, total: number) => [i / total],
      size: 1,
    },
    {
      name: ATTR.POINT_SIZE,
      data: () => [window.devicePixelRatio * 1.3],
      size: 1,
    },
  ];

  const uniforms = {
    uProgress: {
      type: "float",
      value: [0.0],
    },
  }

  return {
    uniforms,
    attributes,
    multiplier: 4000,
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
  };
};
