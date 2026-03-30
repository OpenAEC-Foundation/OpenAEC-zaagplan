/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OpenAEC Dark Theme
        'oaec-bg': '#36363E',
        'oaec-bg-lighter': '#44444C',
        'oaec-bg-input': '#2E2E36',
        'oaec-bg-canvas': '#1a1a2e',
        'oaec-accent': '#D97706',
        'oaec-accent-hover': '#EA580C',
        'oaec-text': '#FAFAF9',
        'oaec-text-secondary': 'rgba(250, 250, 249, 0.6)',
        'oaec-text-muted': 'rgba(250, 250, 249, 0.5)',
        'oaec-border': 'rgba(217, 119, 6, 0.25)',
        'oaec-border-subtle': 'rgba(217, 119, 6, 0.15)',
        'oaec-success': '#16A34A',
        'oaec-danger': '#f87171',
        'oaec-warning': '#F59E0B',
        'oaec-info': '#60A5FA',
        // Legacy aliases (for gradual migration)
        'violet': '#36363E',
        'violet-light': '#44444C',
        'verdigris': '#D97706',
        'verdigris-light': '#EA580C',
        'friendly-yellow': '#F59E0B',
        'warm-magenta': '#f87171',
        'flaming-peach': '#f87171',
      },
      fontFamily: {
        'sans': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(217, 119, 6, 0.25)',
      },
    },
  },
  plugins: [],
}
