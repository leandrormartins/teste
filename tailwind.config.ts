import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e0457b",
          50: "#fef1f6",
          100: "#fde4ec",
          200: "#fac8d8",
          300: "#f59cb8",
          400: "#ed6c95",
          500: "#e0457b",
          600: "#c92962",
          700: "#a91d50",
          800: "#8b1b45",
          900: "#741b3e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
