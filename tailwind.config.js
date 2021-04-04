module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minWidth: {
       '1/4': '25%',
       '1/2': '50%',
       '3/4': '75%',
       '12': '12rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
