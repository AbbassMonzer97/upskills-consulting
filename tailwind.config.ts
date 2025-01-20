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
        interphasesBold: ["TT Interphases Pro Trial Bold", "sans"],
        interphasesRegular: ["TT Interphases Pro Trial Regular", "sans"],
        witBold: ["whatever it takes bold", "sans"],
      },
      textDirection: {
        rtl: "rtl",
        ltr: "ltr",
      },
    },
  },
  plugins: [],
} satisfies Config;
