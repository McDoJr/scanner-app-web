/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#060606",
        background: "#FFF3EB"
      },
      fontFamily: {
        roboto: "Roboto"
      }
    },
  },
  plugins: [],
}

