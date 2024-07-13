import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        nav: "65px",
      },
      colors: {
        blue: {
          100: "#402E7A",
          200: "#4C3BCF",
          300: "#4B70F5",
          400: "#3DC2EC",
        },
        green: {
          100: "#059212",
          200: "#1A5319",
          300: "#508D4E",
          400: "#597445",
        },
        black: {
          100: "#0C0C0C",
          200: "#191919",
          300: "#222831",
          400: "#31363F",
        },
      },
      container: {
        center: true,
        padding: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
