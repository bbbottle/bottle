module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx, mdx}",
  ],
  presets: [
    require('@bbki.ng/stylebase')
  ],
};
