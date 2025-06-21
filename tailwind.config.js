/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Colors - Updated to Teal/Blue-Green theme
        "gonorte-teal": "#0D9488",
        "brand-black": "#000000",
        "brand-white": "#FFFFFF",

        // Primary Colors (updated to Teal/Blue-Green theme)
        primary: {
          light: "#2DD4BF", // Light teal
          dark: "#0F766E", // Dark teal
          DEFAULT: "#0D9488",
        },
        // Secondary Colors
        secondary: {
          light: "#14B8A6", // Teal
          dark: "#0F766E",
          DEFAULT: "#14B8A6",
        },
        // Accent Colors
        accent: {
          light: "#06B6D4", // Cyan
          dark: "#0891B2",
          DEFAULT: "#06B6D4",
        },
        // Neutral Colors
        neutral: {
          background: {
            light: "#F8FAFC", // Very light blue-gray
            dark: "#0F172A", // Very dark blue-gray
            DEFAULT: "#F8FAFC",
          },
          surface: {
            light: "#FFFFFF", // White
            dark: "#1E293B", // Dark blue-gray
            DEFAULT: "#FFFFFF",
          },
          border: {
            light: "#E2E8F0", // Light blue-gray
            dark: "#334155", // Dark blue-gray
            DEFAULT: "#E2E8F0",
          },
        },
        // Text Colors
        text: {
          default: {
            light: "#0F172A", // Dark blue-gray
            dark: "#F8FAFC", // Very light blue-gray
            DEFAULT: "#0F172A",
          },
          muted: {
            light: "#64748B", // Medium blue-gray
            dark: "#94A3B8", // Light blue-gray
            DEFAULT: "#64748B",
          },
          primary: {
            // Updated to Teal theme
            light: "#2DD4BF", // Light teal
            dark: "#0F766E", // Dark teal
            DEFAULT: "#0D9488",
          },
        },
        // Semantic Colors
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
