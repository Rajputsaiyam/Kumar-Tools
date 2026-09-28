/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#081829",       // Deepest industrial steel midnight
          navy: "#0C2340",       // Imperial steel navy (matches logo hammer & KUMAR)
          blue: "#164E87",       // Mid vibrant steel blue
          orange: "#FF5E00",     // Radiant electric flame orange (matches logo wrench & TOOLS)
          orangeHover: "#E65100",// Deep flame orange
          orangeLight: "#FFF4ED",// Soft warm orange tint
          cyan: "#0284C7",       // Crisp cooling air cyan for HVAC
          cyanLight: "#E0F2FE",  // Soft cooling tint
          slate: "#334155",      // Clean readable text slate
          light: "#F8FAFC",      // Clean light background
          surface: "#FFFFFF",    // Pure white cards
          border: "#E2E8F0",     // Crisp borders
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(12, 35, 64, 0.05)",
        card: "0 10px 30px -5px rgba(12, 35, 64, 0.08)",
        glow: "0 0 25px rgba(255, 94, 0, 0.35)",
        glowNavy: "0 0 30px rgba(12, 35, 64, 0.25)",
      },
    },
  },
  plugins: [],
};
