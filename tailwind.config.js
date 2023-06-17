import { blackA, green, mauve, violet } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...mauve,
        ...violet,
      },
    },
  },
  plugins: [],
};
