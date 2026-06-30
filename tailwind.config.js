/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surface2: 'rgb(var(--surface-2) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        ink: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
        good: 'rgb(var(--good) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Just Another Hand"', 'cursive'],
        sans: ['Lato', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.18em',
      },
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
    },
  },
  plugins: [],
}
