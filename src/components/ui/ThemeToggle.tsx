/**
 * @file ThemeToggle.tsx
 * @description This file defines a UI component for toggling the application's theme.
 * It uses icons (Sun and Moon) to represent the current theme and the action to switch.
 * This component is typically placed in the Navbar or a settings menu.
 */
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa6';

/**
 * A button component that allows users to toggle between light and dark themes.
 * It displays either a SunIcon or MoonIcon based on the current theme with a smooth transition.
 * @returns {JSX.Element} The rendered ThemeToggle button.
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-neutral-surface-light dark:bg-neutral-surface-dark hover:bg-neutral-border-light dark:hover:bg-neutral-border-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary overflow-hidden group shadow-sm hover:shadow-md"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="relative w-5 h-5 md:w-6 md:h-6">
        <FaSun 
          className={`absolute inset-0 w-full h-full text-yellow-500 transition-all duration-500 transform ${
            theme === 'light' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-0'
          }`} 
        />
        <FaMoon 
          className={`absolute inset-0 w-full h-full text-primary transition-all duration-500 transform ${
            theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'
          }`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
