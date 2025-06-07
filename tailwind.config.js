/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F1592A",
        background: "#FFFFFF",
        border: "#E0E0E0",
        card: "#FFFFFF",
        foreground: "#1F1F1F",
        foregroundSec: "#666666",
        muted: "#999999",
        success: "#4CAF50",
        warning: "#FFC107",
        danger: "#F44336",
        info: "#2196F3",
      },
    },
  },
  plugins: [],
};
