import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out
          ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
        `}
      >
        <span className="absolute inset-0 flex items-center justify-center text-xs">
          {theme === 'light' ? '☀️' : '🌙'}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;