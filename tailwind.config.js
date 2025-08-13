/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B63E5',
        },
        gray: {
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          blue: '#0B63E5',
          purple: '#A855F7',
          pink: '#EC4899',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(0,0,0,0.05), 0 1px 3px 0 rgba(0,0,0,0.1)',
      },
      borderRadius: {
        md: '6px',
      },
    },
  },
  plugins: [],
};
