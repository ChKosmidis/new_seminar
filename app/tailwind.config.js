/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        paper: '#F2F2EE',
        ink: '#111111',
        graphite: '#0A0A0A',
        ash: '#EDEDED',
        orange: '#FF4500',
        success: '#00CC66',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      letterSpacing: {
        tight: '-0.03em',
      },
    },
  },
  plugins: [],
}
