module.exports = {
  handler: function ({ addBase }) {
    addBase({
      h1: { fontSize: "2.25rem" },
      h2: { fontSize: "1.5rem" },
      h3: { fontSize: "1.25rem" },
      h4: { fontSize: "1rem" },
      h5: { fontSize: "1rem" },
      ".lqip-blur": {
        backdropFilter: "blur(20px)",
      },
    });
  },
};
