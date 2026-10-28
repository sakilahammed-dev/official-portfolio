import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#08090A",
          surface: "#0E1012",
          elevated: "#15181B",
          card: "rgba(18, 20, 24, 0.75)",
        },
        brand: {
          blue: "#455CE9",
          "blue-hover": "#334BD3",
          cyan: "#00F0FF",
          emerald: "#24C958",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(69, 92, 233, 0.35)",
          solid: "#26292E",
        },
        text: {
          primary: "#F4F5F6",
          secondary: "#9EA3A8",
          muted: "#62666B",
        },
      },
      fontFamily: {
        sans: ["var(--font-neue-montreal)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
        pill: "9999px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-fade": "glowFade 3s ease-in-out infinite alternate",
      },
      keyframes: {
        glowFade: {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
