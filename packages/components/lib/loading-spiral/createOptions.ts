import { ATTR, VERTEX_SHADER, FRAGMENT_SHADER } from "./constants";
import { rgba } from "./utils";

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

export const createOptions = (opt: IOpt = DEFAULT_OPT) => {
  const { multiplier, color, length, offset = -1 * 0.3 } = opt;

  const attributes = [
    {
      name: ATTR.PERCENT,
      data: (i: number, total: number) => [i / total],
      size: 1,
    },
    {
      name: ATTR.LENGTH,
      data: () => [length],
      size: 1,
    },
    {
      name: ATTR.COLOR,
      data: () => rgba(color),
      size: 3,
    },
    {
      name: ATTR.OFFSET_Y,
      data: () => [offset],
      size: 1,
    },
    {
      name: ATTR.POINT_SIZE,
      data: () => [window.devicePixelRatio * 1.5],
      size: 1,
    },
  ];

  return {
    attributes,
    multiplier,
    vertex: VERTEX_SHADER,
    fragment: FRAGMENT_SHADER,
  };
};
