/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["app/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["var(--font-inter)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
