/**
 * @file ThemeContext.tsx
 * @description This file defines the context for theme management (light/dark modes) within the application.
 * It provides a ThemeProvider component to wrap the application and a useTheme hook
 * to access and toggle the theme state. The theme is persisted in localStorage.
 */
import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // Import the custom hook

type Theme = 'light' | 'dark';

/**
 * Defines the shape of the theme context.
 */
interface ThemeContextType {
  /** The current active theme ('light' or 'dark'). */
  theme: Theme;
  /** Function to toggle the current theme. */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Defines the props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  /** The child components that the ThemeProvider will wrap. */
  children: ReactNode;
}

/**
 * Provides theme context to its children components.
 * It manages the current theme state and allows toggling between 'light' and 'dark' modes.
 * The theme state is persisted to localStorage and applied to the document's root element.
 * @param {ThemeProviderProps} props The properties for the ThemeProvider.
 * @returns {JSX.Element} The ThemeProvider component.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // TODO: The system theme preference detection logic (if added) would now be part of the
  // initialValue logic within useLocalStorage or passed as initialValue after checking here.
  // For simplicity, we'll keep 'light' as the default if nothing is in localStorage or system pref isn't checked.
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove previous theme class
    root.classList.remove('light', 'dark');
    // Add current theme class
    if (theme) {
      root.classList.add(theme);
    }
    // The localStorage.setItem is now handled by the useLocalStorage hook.
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access the current theme and theme toggling function.
 * Must be used within a ThemeProvider.
 * @throws {Error} If used outside of a ThemeProvider.
 * @returns {ThemeContextType} The theme context value, including the current theme and toggleTheme function.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
