const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1F91CC',
        'primary-dark': '#0C80AA',
        'secondary-dark': '#243548',
        secondary: '#454A54',
        'secondary-light': '#95a5a6',
      },
      fontFamily: {
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        serif: ['Source Sans Pro', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [],
}
