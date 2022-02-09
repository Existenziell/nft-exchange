module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': ['Nunito'],
      'serif': ['Nunito'],
      'mono': ['Nunito'],
      'display': ['Nunito'],
      'body': ['Nunito']
    },
    extend: {
      colors: {
        'brand': '#a6d1c9',
        'brand-dark': '#282b29',
        'highlight': '#C90076',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
