export interface LoadingSpiralSettings {
  canvas?: HTMLCanvasElement;
  step?: number;
}

export const createSettings = (settings: LoadingSpiralSettings) => {
  const { canvas, step = 0.09 } = settings;

  const uniforms = {
    uProgress: {
      type: 'float',
      value: [0.0],
    },
  };

  return {
    uniforms,
    devicePixelRatio: window.devicePixelRatio,
    shouldRender: true,
    canvas,
    onRender: (r: { uniforms: { uProgress: { value: number[] } } }) => {
      const { uProgress } = r.uniforms;
      uProgress.value[0] += step;
    },
  };
};
