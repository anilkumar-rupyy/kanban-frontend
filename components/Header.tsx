'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

function HeaderContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Kanban Todos
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-900 dark:text-white" />
          ) : (
            <Sun className="w-5 h-5 text-gray-900 dark:text-white" />
          )}
        </button>
      </div>
    </header>
  );
}

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kanban Todos
          </h1>
          <div className="w-9 h-9"></div>
        </div>
      </header>
    );
  }

  return <HeaderContent />;
}
