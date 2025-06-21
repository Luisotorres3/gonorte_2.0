/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          light: '#6D28D9', // Vibrant purple
          dark: '#8B5CF6',
          DEFAULT: '#6D28D9',
        },
        // Secondary Colors
        secondary: {
          light: '#0D9488', // Teal
          dark: '#2DD4BF',
          DEFAULT: '#0D9488',
        },
        // Accent Colors
        accent: {
          light: '#F97316', // Orange
          dark: '#FB923C',
          DEFAULT: '#F97316',
        },
        // Neutral Colors
        neutral: {
          background: {
            light: '#F3F4F6', // Very light gray
            dark: '#1F2937',  // Very dark gray/blue
            DEFAULT: '#F3F4F6',
          },
          surface: {
            light: '#FFFFFF', // White
            dark: '#374151',  // Slightly lighter than background dark
            DEFAULT: '#FFFFFF',
          },
          border: {
            light: '#D1D5DB', // Light gray
            dark: '#4B5563',  // Dark gray
            DEFAULT: '#D1D5DB',
          },
        },
        // Text Colors
        text: {
          default: {
            light: '#111827', // Dark gray/black
            dark: '#F9FAFB',  // Very light gray/white
            DEFAULT: '#111827',
          },
          muted: {
            light: '#6B7280', // Medium gray
            dark: '#9CA3AF',  // Light gray
            DEFAULT: '#6B7280',
          },
          primary: {
            light: '#6D28D9', // Primary color
            dark: '#8B5CF6',
            DEFAULT: '#6D28D9',
          },
        },
        // Semantic Colors
        semantic: {
          success: {
            light: '#10B981', // Green
            dark: '#34D399',
            DEFAULT: '#10B981',
          },
          error: {
            light: '#EF4444', // Red
            dark: '#F87171',
            DEFAULT: '#EF4444',
          },
          warning: {
            light: '#F59E0B', // Yellow/Amber
            dark: '#FBBF24',
            DEFAULT: '#F59E0B',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      spacing: {
        'space-xs': '0.25rem', // 4px
        'space-sm': '0.5rem',  // 8px
        'space-md': '1rem',    // 16px
        'space-lg': '1.5rem',  // 24px
        'space-xl': '2rem',    // 32px
      },
      borderRadius: {
        'radius-sm': '0.125rem', // 2px
        'radius-md': '0.25rem',  // 4px
        'radius-lg': '0.5rem',   // 8px
        'radius-full': '9999px',
      },
    },
  },
  plugins: [],
}
