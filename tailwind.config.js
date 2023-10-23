/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
            primary: "rgba(66, 133, 244, 1), rgba(60, 131, 249, 1)",
            lightPi: "#EE8484",
            lightGr: "#98D89E",
            gray : "#858585",
            lightYe: "#DEBF85",
            lightBl: "#A9B0E5",

          'primary-orange': '#FF5722',
      },
    },
  },
  plugins: [],
}
