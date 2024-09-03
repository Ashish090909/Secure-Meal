/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bit-bg': "url('public\bit-bg.webp')",
        'bit-logo': "url('public\bit-logo.png')",
      }
    },
  },
  plugins: [],
}