import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "src/**/!(*.stories|*.spec|*.map).{ts,html,tsx}",
    "./components/**/*.{html,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#6688BD",
        orange: "#F4975D",
        lightBlue: "#9FC0E0",
        lightOrange: "#F6B249",
        gray: "#F3F4F6",
        grayText: "#BCBCBD",
      },
      fontFamily: {
        avBlack: ["Avenir-Black", "sans"],
        avHeavy: ["Avenir-Heavy", "sans"],
        avMedium: ["Avenir-Regular", "sans"],
        avRoman: ["Avenir-Roman", "sans"],
      },
    },
  },
  plugins: [],
} satisfies Config;
