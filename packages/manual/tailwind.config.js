/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./blog/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  presets: [require('@bbki.ng/stylebase')],
}
