module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#2D3748', // Dark Gray
        secondary: '#38B2AC', // Teal
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        'h2': 700,
        'h5': 400,
        'body1': 300,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};