'use client';

import { useLocalStorage, useMediaQuery } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import { PrefersColorShemeDark, themeOptions } from '@/config/site';

export default function Switch() {
  const isDarkMode = useMediaQuery(PrefersColorShemeDark);
  const systemThemePref: string = isDarkMode ? themeOptions.dark : themeOptions.light;
  const [theme, saveTheme] = useLocalStorage('theme', systemThemePref);

  const handleToggle = () => {
    saveTheme(theme === themeOptions.light ? themeOptions.dark : themeOptions.light);
  };

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        value={theme}
        className="sr-only peer"
        checked={theme === 'dark'}
        onChange={handleToggle}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
    </label>
  );
}
