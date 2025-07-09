/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8F5F0',
        primary: {
          light: '#8D9986',
          DEFAULT: '#7D8C75',
          dark: '#6D7C65'
        },
        secondary: {
          light: '#5A4F45',
          DEFAULT: '#4A3F35',
          dark: '#3A2F25'
        },
        accent: {
          light: '#E9967B',
          DEFAULT: '#E5816B',
          dark: '#D5715B'
        },
        neutral: {
          50: '#F9F9F9',
          100: '#F3F3F3',
          200: '#E8E8E8',
          300: '#DDDDDD',
          400: '#CCCCCC',
          500: '#AAAAAA',
          600: '#888888',
          700: '#666666',
          800: '#444444',
          900: '#222222',
        },
        success: {
          light: '#86EFAC',
          DEFAULT: '#22C55E',
          dark: '#16A34A'
        },
        warning: {
          light: '#FDE68A',
          DEFAULT: '#F59E0B',
          dark: '#D97706'
        },
        error: {
          light: '#FCA5A5',
          DEFAULT: '#EF4444',
          dark: '#DC2626'
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Raleway', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
};