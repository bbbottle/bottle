/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    flex: {
      "almost-half": "0 0 42%",
      half: "0 0 50%",
    },
    variants: {
      extend: {
        boxShadow: ["hover", "active", "group-hover"],
        transitionProperty: ["hover", "active", "group-hover"],
        transitionDuration: ["hover", "active", "group-hover"],
        transitionTimingFunction: ["hover", "active", "group-hover"],
      },
    },
    extend: {
      animation: {
        "ping-fast": "blink .1s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        blink: {
          "0%": { opacity: 1 },
          "75%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      fontSize: {
        h1: "2.25rem",
        h2: "1.5rem",
        h3: "1.25rem",
        h4: "1rem",
        h5: "1rem",
      },
      spacing: {
        1: "0.125rem",
        4: "0.25rem",
        8: "0.5rem",
        16: "1rem",
        32: "2rem",
        64: "4rem",
        128: "8rem",
        256: "16rem",
      },
      boxShadow: {
        panel:
          "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
        input:
          "inset 0px 10px 25px -15px rgba(0, 0, 0, 0.25), inset 0px 5px 10px -5px rgba(17, 24, 39, 0.2)",
        button:
          "0px 10px 15px rgba(0, 0, 0, 0.1), 0px 5px 5px -2px rgba(0, 0, 0, 0.04)",
        "button-hover":
          "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 5px 5px -2px rgba(0, 0, 0, 0.04)",
        empty:
          "0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0)",
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        blue: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        red: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: [
          "pt-sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
          "STSong",
          "SimSun",
        ],
      },

      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            img: {
              marginTop: 0,
              marginBottom: 0,
            },
            "--tw-prose-body": "#000",
            a: {
              color: "rgb(37,99,235)",
              textDecoration: "none",
              padding: "4px",
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
  plugins: [
    require("./plugin"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-animate"),
  ],
};
