/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // The "CanMan" Brand Palette
        brand: {
          green: "#6c9817", // Primary Action (Buttons, Success)
          blue: "#0f6fb7", // Hero Backgrounds
          yellow: "#fcc23f", // Accents/Badges
          dark: "#1f2937", // Text/Footer
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Make sure to import Inter in your CSS
      },
      boxShadow: {
        float:
          "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", // For the floating card
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
