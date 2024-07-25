import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/*.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "body": "#f1f2f3",
      }, 
      screens: {
        "2.5xl": "1366px",
      }, 
      colors: {
        articleText: 'var(--article-text-color)',
        articleBg: 'var(--article-bg-color)',
        buttonText: 'var(--button-text-color)',
        buttonBg: 'var(--button-bg-color)',
        randomArticleBg: 'var(--random-article-bg-color)',
        randomArticleText: 'var(--random-article-text-color)',
        randomArticleDescription: 'var(--random-article-description-color)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;