/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Colors - Updated to Aqua Green theme
        "brand-aqua-light": "#A0EADE", // Light Aqua Green
        "brand-aqua-DEFAULT": "#6AD3B1", // Medium Aqua Green
        "brand-aqua-dark": "#4F9E81", // Dark Aqua Green
        "brand-white": "#FFFFFF",
        "brand-gray-dark": "#333333", // Dark Gray for text

        // Primary Colors (updated to Aqua Green theme)
        primary: {
          light: "#A0EADE", // Light Aqua Green
          dark: "#4F9E81", // Dark Aqua Green
          DEFAULT: "#6AD3B1", // Medium Aqua Green
        },
        // Secondary Colors
        secondary: {
          light: "#88DCCC", // Lighter variant of Aqua Green
          dark: "#5FBBA0", // Darker variant of Aqua Green
          DEFAULT: "#6AD3B1", // Medium Aqua Green (can be same as primary or a close shade)
        },
        // Accent Colors
        accent: {
          light: "#A0EADE", // Light Aqua Green (using primary light for accent)
          dark: "#4F9E81", // Dark Aqua Green (using primary dark for accent)
          DEFAULT: "#6AD3B1", // Medium Aqua Green (using primary default for accent)
        },
        // Neutral Colors
        neutral: {
          background: {
            light: "#FFFFFF", // White background
            dark: "#18181b", // Much darker for true dark mode
            DEFAULT: "#FFFFFF",
          },
          surface: {
            light: "#F7FAFC", // Gris muy claro para cards y superficies
            dark: "#23272f", // Much darker for true dark mode
            DEFAULT: "#FFFFFF",
          },
          border: {
            light: "#D1D5DB", // Light gray for borders
            dark: "#A1A1AA", // Medium gray for borders in dark mode
            DEFAULT: "#D1D5DB",
          },
        },
        // Text Colors
        text: {
          default: {
            light: "#333333", // Dark Gray for text on light backgrounds
            dark: "#FFFFFF", // White text on dark backgrounds
            DEFAULT: "#333333",
          },
          muted: {
            light: "#6B7280", // Medium Gray
            dark: "#D1D5DB", // Light Gray for muted text on dark backgrounds
            DEFAULT: "#6B7280",
          },
          primary: {
            // Updated to Aqua Green theme
            light: "#4F9E81", // Dark Aqua Green for text (ensure contrast)
            dark: "#A0EADE", // Light Aqua Green for text (ensure contrast)
            DEFAULT: "#4F9E81",
          },
        },
        // Semantic Colors - Keep these distinct for their purpose
        semantic: {
          success: {
            light: "#10B981", // Green
            dark: "#34D399",
            DEFAULT: "#10B981",
          },
          error: {
            light: "#EF4444", // Red
            dark: "#F87171",
            DEFAULT: "#EF4444",
          },
          warning: {
            light: "#F59E0B", // Yellow/Amber
            dark: "#FBBF24",
            DEFAULT: "#F59E0B",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      spacing: {
        "space-xs": "0.25rem", // 4px
        "space-sm": "0.5rem", // 8px
        "space-md": "1rem", // 16px
        "space-lg": "1.5rem", // 24px
        "space-xl": "2rem", // 32px
      },
      borderRadius: {
        "radius-sm": "0.125rem", // 2px
        "radius-md": "0.25rem", // 4px
        "radius-lg": "0.5rem", // 8px
        "radius-full": "9999px",
      },
    },
  },
  plugins: [],
};
