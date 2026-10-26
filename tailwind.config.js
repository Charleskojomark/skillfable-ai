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
        "surface": "#0e1321",
        "surface-dim": "#0e1321",
        "surface-bright": "#343948",
        "surface-container-lowest": "#090e1c",
        "surface-container-low": "#161b2a",
        "surface-container": "#1a1f2e",
        "surface-container-high": "#252a39",
        "surface-container-highest": "#303444",
        "on-surface": "#dee2f6",
        "on-surface-variant": "#d8c3ad",
        "inverse-surface": "#dee2f6",
        "inverse-on-surface": "#2b303f",
        "outline": "#a08e7a",
        "outline-variant": "#534434",
        "primary": "#ffc174",
        "primary-container": "#f59e0b",
        "on-primary": "#472a00",
        "on-primary-container": "#613b00",
        "secondary": "#6bd8cb",
        "secondary-container": "#29a195",
        "on-secondary": "#003732",
        "tertiary": "#e2cc73",
        "tertiary-container": "#c5b15b",
        "on-tertiary": "#3a3000",
        "error": "#ffb4ab",
        "error-container": "#93000a",
        "background": "#0e1321",
        "on-background": "#dee2f6",
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
