/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme tokens — actual values live as CSS variables in src/index.css
        paper: 'var(--bg)',
        card: 'var(--card)',
        ink: 'var(--ink)',
        body: 'var(--body)',
        subtle: 'var(--sub)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        warn: 'var(--warn)',
        btnfg: 'var(--btnfg)',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Kept from the old config — used by WeatherApp and PokedexApp
        xxs: '0.7rem',
      },
    },
  },
  plugins: [],
}
