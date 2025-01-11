'use client';
import React from 'react';
import { useTheme } from '@web/providers/ThemeProvider';
import { SunIcon } from '../(icons)/SunIcon';
import { MoonIcon } from '../(icons)/MoonIcon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDarkModeEnabled = theme === 'dark';

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={isDarkModeEnabled}
      />
      <SunIcon className="swap-on h-6 w-6 fill-current" />
      <MoonIcon className="swap-off h-6 w-6 fill-current" />
    </label>
  );
}
