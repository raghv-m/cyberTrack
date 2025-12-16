/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0e27',
        'bg-secondary': '#1a1f3a',
        'bg-tertiary': '#2a2f4a',
        'primary': '#00d4ff',
        'secondary': '#2563eb',
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
        'text-primary': '#e2e8f0',
        'text-secondary': '#94a3b8',
        'text-tertiary': '#64748b',
        'border-color': '#334155',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

