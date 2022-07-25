/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    flex: {
      "almost-half": "0 0 42%",
      half: "0 0 50%",
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            img: {
              marginTop: 0,
              marginBottom: 0,
            },
            a: {
              color: "rgb(37,99,235)",
              textDecoration: "none",
              borderRadius: ".25rem",
              wordBreak: "break-all",
              "&:hover": {
                backgroundColor: "rgb(219,234,254)",
              },
            },
          },
        },
      }),
    },
  },
  safelist: ["md:basis-1/2", "md:basis-full", "md:ml-64", "md:mr-64"],
  plugins: [require("./plugin"), require("@tailwindcss/typography")],
}
