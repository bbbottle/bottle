export default {
  uResolution: {
    type: "vec2",
    value: [
      Math.min(innerWidth, innerHeight),
      Math.min(innerWidth, innerHeight),
    ],
  },
  uDevicePixelRatio: {
    type: "float",
    value: [devicePixelRatio],
  },
  uOffset: {
    type: "vec2",
    value: [
      (innerWidth / innerHeight) > 1 ? (innerWidth - innerHeight) / 2 : 0,
      (innerWidth / innerHeight) < 1 ? (innerHeight - innerWidth) / 2 : 0,
    ],
  },
  pi: {
    type: "float",
    value: [Math.PI],
  },
  uCenter: {
    type: "vec2",
    value: [innerWidth / 2, innerHeight / 2],
  },
  uMouse: {
    type: "vec2",
    value: [0, 0],
  }
}
