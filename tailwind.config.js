/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'paper-cream': '#F6F1EA',
        'suit-brown': '#8A6A52', 
        'hair-brown': '#6B4E3B',
        'deep-brown': '#4A3428',
        'mid-brown': '#7A5A42',
        'light-brown': '#E6D7CC',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}