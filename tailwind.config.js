/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slower': 'ping-slower 3.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'progress': 'progress 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};