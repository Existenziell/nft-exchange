module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
        'brand': '#0076C9',
        'brand-dark': '#FFF',
        'highlight': '#C90076',
      },
      backgroundImage: {
        ribbon: 'url(/icons/ribbon.svg)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
