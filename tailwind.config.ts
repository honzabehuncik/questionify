import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7371FF",
        secondary: "#5C5C5C",
        secondary50: "rgba(92, 92, 92, 0.5)",
        background: "#0F0F0F",
        text: "#FFFFFF",
        highlight: "#8DF0F6",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        'gradient': 'gradient 5s linear infinite',
      },
      keyframes: {
        'gradient': {
          to: { 'background-position': '200% center' },
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
