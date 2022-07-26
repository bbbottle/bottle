module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx, mdx}",
    "./node_modules/@bbki.ng/components/**/*.js",
  ],
  presets: [
    require('@bbki.ng/stylebase')
  ],
};
