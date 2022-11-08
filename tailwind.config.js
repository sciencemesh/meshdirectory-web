const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        blue: '#1F91CC',
        'blue-dark': '#0C80AA',
        'gray-dark': '#243548',
        gray: '#454A54',
        'gray-light': '##95a5a6',
      },
      fontFamily: {
        sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
        serif: ['Source Sans Pro', ...defaultTheme.fontFamily.serif],
      },
      extend: {
        transitionProperty: {
          'height': 'height'
        }
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
