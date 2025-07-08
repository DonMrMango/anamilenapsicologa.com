/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C17767',
          light: '#D4A59A',
          dark: '#A85A4A',
        },
        secondary: {
          DEFAULT: '#7C9885',
          light: '#A3B5AA',
          dark: '#5A7261',
        },
        accent: {
          gold: '#D4A574',
          rose: '#E4B5B0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

