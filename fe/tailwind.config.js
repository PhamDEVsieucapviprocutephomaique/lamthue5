/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#374151",
        accent: "#dc2626",
      },
    },
  },
  plugins: [],
};
