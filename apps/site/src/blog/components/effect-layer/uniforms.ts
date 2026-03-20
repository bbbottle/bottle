const hashStr: string = typeof GLOBAL_COMMIT_HASH === 'string' ? GLOBAL_COMMIT_HASH : '0000000';
const hc = [...hashStr].map(c => parseInt(c, 16) || 0);

export default {
  uResolution: {
    type: 'vec2',
    value: [innerWidth, innerHeight],
  },
  uDevicePixelRatio: {
    type: 'float',
    value: [devicePixelRatio],
  },
  pi: {
    type: 'float',
    value: [Math.PI],
  },
  uMouse: {
    type: 'vec2',
    value: [0, 0],
  },
  uLoading: {
    type: 'float',
    value: [0.0],
  },
  uSpiralProgress: {
    type: 'float',
    value: [0.0],
  },
  uSpiralOpacity: {
    type: 'float',
    value: [0.0],
  },
  uHashChars: {
    type: 'vec4',
    value: [hc[0] ?? 0, hc[1] ?? 0, hc[2] ?? 0, hc[3] ?? 0],
  },
  uHashChars2: {
    type: 'vec4',
    value: [hc[4] ?? 0, hc[5] ?? 0, hc[6] ?? 0, 0],
  },
};
