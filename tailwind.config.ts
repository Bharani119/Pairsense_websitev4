import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        "bg-warm": "var(--bg-warm)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        moss: "var(--moss)",
        mist: "var(--mist)",
        earth: "var(--earth)",
        gold: "var(--gold)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
        wider: "0.08em",
        widest: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
