/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Neera Food Lab Brand Colors
        primary: {
          50: '#fff0f5',
          100: '#ffe0eb',
          200: '#ffc2d6',
          300: '#ff99b8',
          400: '#ff6699',
          500: '#FF0060', // Main brand color
          600: '#e60055',
          700: '#cc004a',
          800: '#b30040',
          900: '#990035',
        },
        // Neutral colors for text and backgrounds
        brand: {
          white: '#FFFFFF',
          black: '#000000',
          'gray-50': '#f9fafb',
          'gray-100': '#f3f4f6',
          'gray-200': '#e5e7eb',
          'gray-300': '#d1d5db',
          'gray-400': '#9ca3af',
          'gray-500': '#6b7280',
          'gray-600': '#4b5563',
          'gray-700': '#374151',
          'gray-800': '#1f2937',
          'gray-900': '#111827',
        }
      },
      fontFamily: {
        // Neera Food Lab Brand Fonts
        sans: ['Instrumental Sans', 'system-ui', 'sans-serif'], // Body text
        serif: ['Instrumental Sans', 'system-ui', 'sans-serif'], // Headings (changed to Instrumental Sans)
        body: ['Instrumental Sans', 'system-ui', 'sans-serif'],
        heading: ['Instrumental Sans', 'system-ui', 'sans-serif'], // Changed to Instrumental Sans
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
