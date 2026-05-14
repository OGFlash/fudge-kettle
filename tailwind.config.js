/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent: deep raspberry — primary CTA, links, highlights
        teal: {
          50:  '#fff0f5',
          100: '#ffd6e5',
          200: '#ffaacb',
          300: '#f772a0',
          400: '#e84b82',
          500: '#d1295f',  // ← primary brand accent
          600: '#b01f4e',
          700: '#8c163d',
          800: '#66102c',
          900: '#420a1c',
        },
        // Deep plum/wine — headings, body text, dark surfaces (replaces brown)
        chocolate: {
          50:  '#faf8fb',
          100: '#f0eaf4',
          200: '#d9c9e4',
          300: '#b99ecb',
          400: '#9270ab',
          500: '#6e4a87',
          600: '#523369',
          700: '#3a2250',
          800: '#261438',
          900: '#150a22',
        },
        // Surface: soft blush ivory — backgrounds and subtle fills
        cream: {
          50:  '#fefbfd',
          100: '#fdf3f8',
          200: '#f7e2ef',
          300: '#eecde1',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
