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
        "--background": "0 0% 100%",
        "--foreground": "222.2 47.4% 11.2%",
        "--muted": "210 40% 96.1%",
        "--muted-foreground": "215.4 16.3% 46.9%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "222.2 47.4% 11.2%",
        "--border": "214.3 31.8% 91.4%",
        "--input": "214.3 31.8% 91.4%",
        "--card": "0 0% 100%",
        "--card-foreground": "222.2 47.4% 11.2%",
        "--primary": "222.2 47.4% 11.2%",
        "--primary-foreground": "210 40% 98%",
        "--secondary": "210 40% 96.1%",
        "--secondary-foreground": "222.2 47.4% 11.2%",
        "--accent": "210 40% 96.1%",
        "--accent-foreground": "222.2 47.4% 11.2%",
        "--destructive": "0 100% 50%",
        "--destructive-foreground": "210 40% 98%",
        "--ring": "215 20.2% 65.1%",
        "--radius": "0.5rem",
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
        backdropFilter: "blur(3px)",
      },
    });
  },
};
