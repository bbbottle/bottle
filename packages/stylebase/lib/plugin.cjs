const {
  redKey,
  purpleKey,
  blueKey,
  darkBlueKey,
  orangeKey,
  greyKey,
  greenKey,
  darkKey,
  boldKey,
  brownKey,
  bgWhiteKey,
} = require("./hljsConst");

module.exports = {
  handler: function ({ addBase, addUtilities, theme, addVariant }) {
    addBase({
      ":root": {
        "--radix-accordion-content-height": "0",
        "--ring": "215 20.2% 65.1%",
        "--radius": "0.5rem",
        "--background": "0 0% 100%",
        "--foreground": "240 10% 3.9%",
        "--card": "0 0% 100%",
        "--card-foreground": "240 10% 3.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "240 10% 3.9%",
        "--primary": "240 5.9% 10%",
        "--primary-foreground": "0 0% 98%",
        "--secondary": "240 4.8% 95.9%",
        "--secondary-foreground": "240 5.9% 10%",
        "--muted": "240 4.8% 95.9%",
        "--muted-foreground": "240 3.8% 46.1%",
        "--accent": "240 4.8% 95.9%",
        "--accent-foreground": "240 5.9% 10%",
        "--destructive": "0 72.22% 50.59%",
        "--destructive-foreground": "0 0% 98%",
        "--border": "240 5.9% 90%",
        "--input": "240 5.9% 90%",
      },

      h1: { fontSize: "2.25rem" },
      h2: { fontSize: "1.5rem" },
      h3: { fontSize: "1.25rem" },
      h4: { fontSize: "1rem" },
      h5: { fontSize: "1rem" },
      ".hljs": {
        color: "#24292e",
        background: "#ffffff",
      },
      ".prose pre": {
        color: "#24292f !important",
        backgroundColor: "#f6f8fa !important",
      },
      "a:focus": {
        outline: "none",
        textDecoration: "none",
      },
      ".hljs-emphasis": {
        fontStyle: "italic",
      },
      ".hljs-strong": {
        fontWeight: "bold",
      },
      [redKey]: {
        color: "#d73a49",
      },
      [purpleKey]: {
        color: "#6f42c1",
      },
      [blueKey]: {
        color: "#005cc5",
      },
      [darkBlueKey]: {
        color: "#032f62",
      },
      [orangeKey]: {
        color: "#e36209",
      },
      [greyKey]: {
        color: "#6a737d",
      },
      [greenKey]: {
        color: "#22863a",
      },
      [darkKey]: {
        color: "#24292e",
      },
      [boldKey]: {
        fontWeight: "bold",
      },
      [brownKey]: {
        color: "#735c0f",
      },
      [bgWhiteKey]: {
        backgroundColor: "#ffeef0",
      },
    });
    addUtilities({
      ".no-scrollbar::-webkit-scrollbar": {
        display: "none",
      },
      ".no-scrollbar": {
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
      ".blur-cover": {
        "background-color": "rgba(255, 255, 255, 0.5)",
        "backdrop-filter": "blur(7px)",
      },
      ".lqip-blur": {
        backdropFilter: "blur(20px)",
      },
      ".text-blur": {
        backdropFilter: "blur(7px)",
      },
    });
  },
};
