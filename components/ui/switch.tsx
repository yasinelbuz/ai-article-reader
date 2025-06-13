'use client';

import { useTheme } from 'next-themes';

export default function Switch() {
  const { theme, setTheme, systemTheme } = useTheme();

  const handleToggle = () => {
    setTheme(themeValue === 'dark' ? 'light' : 'dark');
  };

  const themeValue = theme === 'system' ? systemTheme : theme;

  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        value={theme}
        className="sr-only peer"
        checked={themeValue === 'dark'}
        onChange={handleToggle}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {themeValue === 'dark' ? 'Dark' : 'Light'}
      </span>
    </label>
  );
}
