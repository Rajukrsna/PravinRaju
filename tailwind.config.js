// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          700: '#1d4ed8',
          800: '#1e40af',
          100: '#dbeafe',
          400: '#60a5fa',
          600: '#2563eb',
        },
        secondary: {
          50: '#f9fafb', // ✅ Add this
          300: '#9ca3af',
          400: '#6b7280',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
