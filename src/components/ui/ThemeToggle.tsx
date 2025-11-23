/**
 * @file ThemeToggle.tsx
 * @description This file defines a UI component for toggling the application's theme.
 * It uses icons (Sun and Moon) to represent the current theme and the action to switch.
 * This component is typically placed in the Navbar or a settings menu.
 */
import { useTheme } from '../../contexts/ThemeContext';

/**
 * SVG icon representing the sun, used for light mode indication.
 * @returns {JSX.Element} The SunIcon component.
 */
const SunIcon = () => (
  // Updated to use theme-aware semantic colors and icon utility class
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-semantic-warning-light dark:text-semantic-warning-dark icon-default">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

/**
 * SVG icon representing the moon, used for dark mode indication.
 * @returns {JSX.Element} The MoonIcon component.
 */
const MoonIcon = () => (
  // Updated to use theme-aware primary text colors and icon utility class
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary dark:text-primary icon-default">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

/**
 * A button component that allows users to toggle between light and dark themes.
 * It displays either a SunIcon or MoonIcon based on the current theme.
 * @returns {JSX.Element} The rendered ThemeToggle button.
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-space-sm bg-neutral-surface-light dark:bg-neutral-surface-dark hover:bg-neutral-border-light dark:hover:bg-neutral-border-dark text-text-muted-light dark:text-text-muted-dark rounded-radius-full focus:outline-none focus:ring-2 focus:ring-primary-DEFAULT dark:focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-neutral-background-light dark:focus:ring-offset-neutral-background-dark transition-colors duration-300"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;
