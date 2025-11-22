export const rgba = (val: number[]) => {
  const [r, g, b, a] = val;

  return [r / 255, g / 255, b / 255, a];
};
