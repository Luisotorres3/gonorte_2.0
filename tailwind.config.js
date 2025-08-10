/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand Colors - Aqua Green Theme
        "brand-aqua-lightest": "#E0F7F2", // Very Light Aqua Green (for backgrounds)
        "brand-aqua-light": "#A0EADE", // Light Aqua Green
        "brand-aqua-DEFAULT": "#6AD3B1", // Medium Aqua Green (Primary)
        "brand-aqua-dark": "#4F9E81", // Dark Aqua Green
        "brand-aqua-darkest": "#3E7C68", // Very Dark Aqua Green (for text or dark accents)

        // Primary Colors (Aqua Green based)
        primary: {
          light: "#A0EADE", // Light Aqua Green
          DEFAULT: "#6AD3B1", // Medium Aqua Green
          dark: "#4F9E81", // Dark Aqua Green
          hover: "#5FBBA0", // Slightly darker for hover
          active: "#4F9E81", // Same as dark or a bit darker for active
        },
        // Secondary Colors (Complementary or analogous to Aqua Green)
        secondary: {
          light: "#BCF0E4", // Lighter variant for secondary elements
          DEFAULT: "#88DCCC", // A distinct shade of Aqua or a complementary color
          dark: "#5FBBA0", // Darker variant for secondary elements
          hover: "#7ACAAE", // Hover state for secondary
          active: "#6AD3B1", // Active state for secondary
        },
        // Tertiary/Accent Colors (Can be a contrasting color or another shade of green)
        accent: {
          light: "#F0FDF4", // Very light green or a contrasting light color
          DEFAULT: "#A7F3D0", // A bright, eye-catching accent
          dark: "#6EE7B7", // Darker accent
          hover: "#86EFAC", // Hover state for accent
          active: "#6EE7B7", // Active state for accent
        },
        // Neutral Colors
        neutral: {
          background: {
            light: "#FFFFFF", // White background for light mode
            dark: "#1A202C", // Dark Slate Gray for dark mode background
            DEFAULT: "#FFFFFF",
          },
          surface: {
            light: "#F7FAFC", // Light Gray for cards/surfaces in light mode
            dark: "#2D3748", // Darker Gray for cards/surfaces in dark mode
            DEFAULT: "#F7FAFC",
          },
          border: {
            light: "#E2E8F0", // Light Gray for borders in light mode
            dark: "#4A5568", // Gray for borders in dark mode
            DEFAULT: "#E2E8F0",
          },
        },
        // Text Colors
        text: {
          default: {
            light: "#1A202C", // Dark Gray for text on light backgrounds
            dark: "#E2E8F0", // Light Gray for text on dark backgrounds
            DEFAULT: "#1A202C",
          },
          muted: {
            light: "#4A5568", // Increased contrast for light mode
            dark: "#CBD5E0", // Increased contrast for dark mode
            DEFAULT: "#4A5568",
          },
          primary: {
            light: "#4F9E81", // Dark Aqua Green for text on light backgrounds
            dark: "#A0EADE", // Light Aqua Green for text on dark backgrounds
            DEFAULT: "#4F9E81",
          },
          accent: {
            light: "#3E7C68", // Darkest Aqua for accent text on light backgrounds
            dark: "#A0EADE", // Light Aqua for accent text on dark backgrounds
            DEFAULT: "#3E7C68",
          },
        },
        // Semantic Colors
        semantic: {
          success: {
            light: "#38A169", // Green
            dark: "#68D391", // Lighter Green for dark mode
            DEFAULT: "#38A169",
          },
          error: {
            light: "#E53E3E", // Red
            dark: "#FC8181", // Lighter Red for dark mode
            DEFAULT: "#E53E3E",
          },
          warning: {
            light: "#DD6B20", // Orange
            dark: "#F6AD55", // Lighter Orange for dark mode
            DEFAULT: "#DD6B20",
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
