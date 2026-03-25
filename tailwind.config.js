/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#1e2a35',
          50:  '#f4f7f9',
          100: '#e8eef3',
          200: '#cddae4',
          300: '#a8bfce',
          400: '#7a9db5',
          500: '#567d96',
          600: '#3f6279',
          700: '#2d4a5e',
          800: '#e8eef3',
          900: '#f4f7f9',
        },
        accent: {
          DEFAULT: '#3b82b0',
          light: '#6aafd4',
          dark:  '#1e5f8a',
        },
        sev: {
          mild:     '#2e9e6b',
          moderate: '#e07c2a',
          severe:   '#d43f3f',
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease both',
        'fade-in': 'fadeIn 0.2s ease both',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
      },
    },
  },
  plugins: [],
}
