export default [
  {
    name: "aPos",
    size: 2,
    data: (i: number, total: number) => {
      const col = Math.sqrt(total);
      const row = col;

      const x = (i % col) / col;
      const y = Math.floor(i / row) / row;

      return [x, y];
    },
  },
];
