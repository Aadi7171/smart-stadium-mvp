import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-card': 'var(--bg-card)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
        'accent-amber': 'var(--accent-amber)',
        'state-clear': 'var(--state-clear)',
        'state-moderate': 'var(--state-moderate)',
        'state-critical': 'var(--state-critical)',
        'border-hairline': 'var(--border-hairline)',
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        display: ['var(--font-display)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
