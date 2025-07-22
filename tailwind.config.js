/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
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
        "background-dark": "#18181b",
        border: "#E0E0E0",
        "border-dark": "#27272a",
        card: "#FFFFFF",
        "card-dark": "#232323",
        foreground: "#6a7282",
        "foreground-sec": "#F1F1F1",
        muted: "#999999",
        "muted-dark": "#555555",
        success: "#4CAF50",
        warning: "#FFC107",
        danger: "#F44336",
        info: "#2196F3",
      },
    },
  },
  plugins: [],
};
