export interface ISettings {
  canvas?: HTMLCanvasElement;
  step?: number;
}

export const createSettings = (settings: ISettings) => {
  const { canvas, step = 0.09 } = settings;

  const uniforms = {
    uProgress: {
      type: "float",
      value: 0.0,
    },
  };

  return {
    uniforms,
    devicePixelRatio: window.devicePixelRatio,
    shouldRender: true,
    canvas,
    onRender: (r: any) => {
      const { uProgress } = r.uniforms;
      uProgress.value += step;
    },
  };
};
