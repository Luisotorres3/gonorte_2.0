/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        /* ============================================
         * CSS VARIABLE BASED PALETTE SYSTEM
         * Colors are defined in src/styles/palette.css
         * Simply edit that file to change the entire color scheme
         * ============================================ */
        
        // Primary Colors - Main brand color scale
        primary: {
          50: "hsl(var(--color-primary-50) / <alpha-value>)",
          100: "hsl(var(--color-primary-100) / <alpha-value>)",
          200: "hsl(var(--color-primary-200) / <alpha-value>)",
          300: "hsl(var(--color-primary-300) / <alpha-value>)",
          400: "hsl(var(--color-primary-400) / <alpha-value>)",
          500: "hsl(var(--color-primary-500) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-primary-500) / <alpha-value>)",
          600: "hsl(var(--color-primary-600) / <alpha-value>)",
          700: "hsl(var(--color-primary-700) / <alpha-value>)",
          800: "hsl(var(--color-primary-800) / <alpha-value>)",
          900: "hsl(var(--color-primary-900) / <alpha-value>)",
          // Legacy aliases for compatibility
          light: "hsl(var(--color-primary-300) / <alpha-value>)",
          dark: "hsl(var(--color-primary-700) / <alpha-value>)",
          hover: "hsl(var(--color-primary-600) / <alpha-value>)",
          active: "hsl(var(--color-primary-700) / <alpha-value>)",
        },
        
        // Secondary Colors - Supporting brand color scale
        secondary: {
          50: "hsl(var(--color-secondary-50) / <alpha-value>)",
          100: "hsl(var(--color-secondary-100) / <alpha-value>)",
          200: "hsl(var(--color-secondary-200) / <alpha-value>)",
          300: "hsl(var(--color-secondary-300) / <alpha-value>)",
          400: "hsl(var(--color-secondary-400) / <alpha-value>)",
          500: "hsl(var(--color-secondary-500) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-secondary-500) / <alpha-value>)",
          600: "hsl(var(--color-secondary-600) / <alpha-value>)",
          700: "hsl(var(--color-secondary-700) / <alpha-value>)",
          800: "hsl(var(--color-secondary-800) / <alpha-value>)",
          900: "hsl(var(--color-secondary-900) / <alpha-value>)",
          // Legacy aliases for compatibility
          light: "hsl(var(--color-secondary-300) / <alpha-value>)",
          dark: "hsl(var(--color-secondary-700) / <alpha-value>)",
          hover: "hsl(var(--color-secondary-600) / <alpha-value>)",
          active: "hsl(var(--color-secondary-700) / <alpha-value>)",
        },
        
        // Accent Colors - Highlights and CTAs
        accent: {
          50: "hsl(var(--color-accent-50) / <alpha-value>)",
          100: "hsl(var(--color-accent-100) / <alpha-value>)",
          200: "hsl(var(--color-accent-200) / <alpha-value>)",
          300: "hsl(var(--color-accent-300) / <alpha-value>)",
          400: "hsl(var(--color-accent-400) / <alpha-value>)",
          500: "hsl(var(--color-accent-500) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-accent-500) / <alpha-value>)",
          600: "hsl(var(--color-accent-600) / <alpha-value>)",
          700: "hsl(var(--color-accent-700) / <alpha-value>)",
          800: "hsl(var(--color-accent-800) / <alpha-value>)",
          900: "hsl(var(--color-accent-900) / <alpha-value>)",
          // Legacy aliases for compatibility
          light: "hsl(var(--color-accent-300) / <alpha-value>)",
          dark: "hsl(var(--color-accent-700) / <alpha-value>)",
          hover: "hsl(var(--color-accent-600) / <alpha-value>)",
          active: "hsl(var(--color-accent-700) / <alpha-value>)",
        },
        
        // Neutral Colors - Backgrounds, borders, text
        neutral: {
          50: "hsl(var(--color-neutral-50) / <alpha-value>)",
          100: "hsl(var(--color-neutral-100) / <alpha-value>)",
          200: "hsl(var(--color-neutral-200) / <alpha-value>)",
          300: "hsl(var(--color-neutral-300) / <alpha-value>)",
          400: "hsl(var(--color-neutral-400) / <alpha-value>)",
          500: "hsl(var(--color-neutral-500) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-neutral-500) / <alpha-value>)",
          600: "hsl(var(--color-neutral-600) / <alpha-value>)",
          700: "hsl(var(--color-neutral-700) / <alpha-value>)",
          800: "hsl(var(--color-neutral-800) / <alpha-value>)",
          900: "hsl(var(--color-neutral-900) / <alpha-value>)",
          // Legacy aliases for compatibility
          background: {
            light: "hsl(var(--color-neutral-50) / <alpha-value>)",
            dark: "hsl(var(--color-neutral-900) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-bg-base) / <alpha-value>)",
          },
          surface: {
            light: "hsl(var(--color-bg-surface) / <alpha-value>)",
            dark: "hsl(var(--color-bg-surface) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-bg-surface) / <alpha-value>)",
          },
          border: {
            light: "hsl(var(--color-border-base) / <alpha-value>)",
            dark: "hsl(var(--color-border-base) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-border-base) / <alpha-value>)",
          },
        },
        
        // Semantic Background Colors
        bg: {
          base: "hsl(var(--color-bg-base) / <alpha-value>)",
          surface: "hsl(var(--color-bg-surface) / <alpha-value>)",
          elevated: "hsl(var(--color-bg-elevated) / <alpha-value>)",
          muted: "hsl(var(--color-bg-muted) / <alpha-value>)",
        },
        
        // Semantic Foreground/Text Colors
        fg: {
          base: "hsl(var(--color-fg-base) / <alpha-value>)",
          muted: "hsl(var(--color-fg-muted) / <alpha-value>)",
          subtle: "hsl(var(--color-fg-subtle) / <alpha-value>)",
          "on-primary": "hsl(var(--color-fg-on-primary) / <alpha-value>)",
          "on-accent": "hsl(var(--color-fg-on-accent) / <alpha-value>)",
        },
        
        // Semantic Border Colors
        border: {
          base: "hsl(var(--color-border-base) / <alpha-value>)",
          muted: "hsl(var(--color-border-muted) / <alpha-value>)",
          strong: "hsl(var(--color-border-strong) / <alpha-value>)",
        },
        
        // Text Colors (Legacy - for backwards compatibility)
        text: {
          default: {
            light: "hsl(var(--color-fg-base) / <alpha-value>)",
            dark: "hsl(var(--color-fg-base) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-fg-base) / <alpha-value>)",
          },
          muted: {
            light: "hsl(var(--color-fg-muted) / <alpha-value>)",
            dark: "hsl(var(--color-fg-muted) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-fg-muted) / <alpha-value>)",
          },
          primary: {
            light: "hsl(var(--color-primary-600) / <alpha-value>)",
            dark: "hsl(var(--color-primary-400) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-primary-600) / <alpha-value>)",
          },
          accent: {
            light: "hsl(var(--color-accent-700) / <alpha-value>)",
            dark: "hsl(var(--color-accent-400) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-accent-700) / <alpha-value>)",
          },
        },
        
        // Semantic Colors
        success: {
          50: "hsl(var(--color-success-50) / <alpha-value>)",
          100: "hsl(var(--color-success-100) / <alpha-value>)",
          500: "hsl(var(--color-success-500) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-success-500) / <alpha-value>)",
          600: "hsl(var(--color-success-600) / <alpha-value>)",
          700: "hsl(var(--color-success-700) / <alpha-value>)",
        },
        error: {
          50: "hsl(var(--color-error-50) / <alpha-value>)",
          100: "hsl(var(--color-error-100) / <alpha-value>)",
          500: "hsl(var(--color-error-500) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-error-500) / <alpha-value>)",
          600: "hsl(var(--color-error-600) / <alpha-value>)",
          700: "hsl(var(--color-error-700) / <alpha-value>)",
        },
        warning: {
          50: "hsl(var(--color-warning-50) / <alpha-value>)",
          100: "hsl(var(--color-warning-100) / <alpha-value>)",
          500: "hsl(var(--color-warning-500) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-warning-500) / <alpha-value>)",
          600: "hsl(var(--color-warning-600) / <alpha-value>)",
          700: "hsl(var(--color-warning-700) / <alpha-value>)",
        },
        info: {
          50: "hsl(var(--color-info-50) / <alpha-value>)",
          100: "hsl(var(--color-info-100) / <alpha-value>)",
          500: "hsl(var(--color-info-500) / <alpha-value>)",
          DEFAULT: "hsl(var(--color-info-500) / <alpha-value>)",
          600: "hsl(var(--color-info-600) / <alpha-value>)",
          700: "hsl(var(--color-info-700) / <alpha-value>)",
        },
        
        // Legacy semantic colors (for backwards compatibility)
        semantic: {
          success: {
            light: "hsl(var(--color-success-500) / <alpha-value>)",
            dark: "hsl(var(--color-success-500) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-success-500) / <alpha-value>)",
          },
          error: {
            light: "hsl(var(--color-error-500) / <alpha-value>)",
            dark: "hsl(var(--color-error-500) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-error-500) / <alpha-value>)",
          },
          warning: {
            light: "hsl(var(--color-warning-500) / <alpha-value>)",
            dark: "hsl(var(--color-warning-500) / <alpha-value>)",
            DEFAULT: "hsl(var(--color-warning-500) / <alpha-value>)",
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
