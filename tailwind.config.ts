import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        macosLight: "#F5F5F7",
        macosGray: "#A1A1A1",
        macosBlue: "#007AFF",
        macosBorder: "#D1D1D6",
        macosText: "#1C1C1E",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        macos: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        macos: "12px",
      },
    },
  },
  plugins: [],
} satisfies Config;
