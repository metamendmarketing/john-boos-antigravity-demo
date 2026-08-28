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
          canvas: "#fcfbf9",
          surface: "#f5f4ef",
          border: "#e5e5e2",
          dark: "#1f1f1f",
          charcoal: "#121212",
          oxblood: "#6f2e18",
          oxbloodHover: "#562210",
          oxbloodLight: "#fbf2ee",
          gold: "#c5a880",
          muted: "#756e5a",
        },
      },
      fontFamily: {
        sans: [
          '"Neue Haas Grotesk Text Pro"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
