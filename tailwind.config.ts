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
        boos: {
          50: '#fbfaf8',
          100: '#f4f3ef',
          200: '#e8e6df',
          300: '#d7d4c8',
          400: '#b8b3a0',
          500: '#948d77',
          600: '#756e5a',
          700: '#5c5645',
          800: '#474235',
          900: '#1f1f1f',
          950: '#121212',
          red: '#a91b1b',
          redHover: '#8b1515',
          redDark: '#6d1010',
          gold: '#c5a880',
          dark: '#1f1f1f',
          slate: '#343a40',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
