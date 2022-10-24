/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeNotif: 'fadeOut 2s ease-in-out',
      },
      keyframes: theme => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.600') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
      colors: {
        primary: {
          light: "#8d7e6d",
          DEFAULT: "#5f5242",
          dark: "#352a1b",
        },
      },
    },
  },
  plugins: [],
}
